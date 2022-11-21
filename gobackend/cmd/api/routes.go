package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (app *application) routes() *mux.Router {

	router := mux.NewRouter()

	router.NotFoundHandler = http.HandlerFunc(app.notFoundResponse)

	router.MethodNotAllowedHandler = http.HandlerFunc(app.methodNotAllowedResponse)

	router.HandleFunc("/healthcheck", app.healthcheckHandler)
	router.HandleFunc("/usuarios", app.createUserHandler).Methods("POST")
	router.HandleFunc("/usuarios/{id}", app.getUserHandler).Methods("GET")
	router.HandleFunc("/usuarios/{id}", app.updateUserHandler).Methods("PUT")
	router.HandleFunc("/usuarios", app.deleteUserHandler).Methods("DELETE")

	return router

}
