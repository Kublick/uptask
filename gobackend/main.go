package main

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kublick/uptask/db"
	"github.com/kublick/uptask/models"
	"github.com/kublick/uptask/routes"
)

func main() {

	db.DBConnection()

	db.DB.AutoMigrate(models.Usuario{})

	r := mux.NewRouter()

	r.HandleFunc("/", routes.HomeHandler)

	r.HandleFunc("/api/usuarios/", routes.GetUsersHandler).Methods("GET")
	r.HandleFunc("/api/usuarios/{id}", routes.GetUserHandler).Methods("GET")
	r.HandleFunc("/api/usuarios/", routes.CreateUserHandler).Methods("POST")
	r.HandleFunc("/api/usuarios/{id}", routes.UpdateUserHandler).Methods("PUT")
	r.HandleFunc("/api/usuarios/{id}", routes.DeleteUserHandler).Methods("DELETE")

	http.ListenAndServe(":5000", r)
}
