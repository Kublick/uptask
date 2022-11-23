package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kublick/uptask/db"
	"github.com/kublick/uptask/models"
)

func (app *application) GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	var users []models.Usuario
	db.DB.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

func (app *application) GetUserHandler(w http.ResponseWriter, r *http.Request) {
	var user models.Usuario
	params := mux.Vars(r)

	db.DB.First(&user, params["id"])

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}

	json.NewEncoder(w).Encode(&user)

}

func (app *application) CreateUserHandler(w http.ResponseWriter, r *http.Request) {

	var user models.Usuario
	json.NewDecoder(r.Body).Decode(&user)

	createdUser := db.DB.Create(&user)

	err := createdUser.Error

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(&user)

}

func (app *application) UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Update User"))
}

func (app *application) DeleteUserHandler(w http.ResponseWriter, r *http.Request) {

	var user models.Usuario
	params := mux.Vars(r)

	db.DB.First(&user, params["id"])
	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}

	db.DB.Unscoped().Delete(&user)

	w.WriteHeader(http.StatusOK)

}
