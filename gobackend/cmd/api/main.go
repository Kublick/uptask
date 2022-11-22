package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/kublick/uptask/db"
	"github.com/kublick/uptask/models"
	"github.com/kublick/uptask/routes"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
	db   struct {
		dsn string
	}
}

type application struct {
	config config
	logger *log.Logger
}

func main() {

	//Configuration of Server
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|staging|production)")
	flag.Parse()

	// Start Logger Service
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	app := &application{
		config: cfg,
		logger: logger,
	}

	db.DBConnection()

	db.DB.AutoMigrate(models.Usuario{})

	r := mux.NewRouter()

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	r.HandleFunc("/", routes.HomeHandler)

	r.HandleFunc("/api/healthcheck", app.healthcheckHandler)

	r.HandleFunc("/api/usuarios/", routes.GetUsersHandler).Methods("GET")
	r.HandleFunc("/api/usuarios/{id}", routes.GetUserHandler).Methods("GET")
	r.HandleFunc("/api/usuarios/", routes.CreateUserHandler).Methods("POST")
	r.HandleFunc("/api/usuarios/{id}", routes.UpdateUserHandler).Methods("PUT")
	r.HandleFunc("/api/usuarios/{id}", routes.DeleteUserHandler).Methods("DELETE")

	logger.Printf("starting %s server on %s", cfg.env, srv.Addr)
	err := srv.ListenAndServe()
	logger.Fatal(err)

}
