package main

import "github.com/gorilla/mux"

func (app *application) routes() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/healthcheck", app.healthcheckHandler)

	router.HandleFunc("/api/usuarios/", app.GetUsersHandler).Methods("GET")
	router.HandleFunc("/api/usuarios/{id}", app.GetUserHandler).Methods("GET")
	router.HandleFunc("/api/usuarios/", app.CreateUserHandler).Methods("POST")
	router.HandleFunc("/api/usuarios/{id}", app.UpdateUserHandler).Methods("PUT")
	router.HandleFunc("/api/usuarios/{id}", app.DeleteUserHandler).Methods("DELETE")

	return router
}
