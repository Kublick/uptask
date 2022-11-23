package main

import (
	"encoding/json"
	"net/http"

	"github.com/kublick/uptask/db"
	"github.com/kublick/uptask/models"
)

func (app *application) GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	var users []models.Usuario
	db.DB.Find(&users)

	err := app.writeJSON(w, http.StatusOK, envelope{"usuarios": users}, nil)
	if err != nil {
		app.logger.Println(err)
		http.Error(w, "The server encountered a problem and could not process your request", http.StatusInternalServerError)
	}
}

func (app *application) GetUserHandler(w http.ResponseWriter, r *http.Request) {
	var user models.Usuario

	id, err := app.readIDParam(r)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	db.DB.First(&user, id)

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"usuario": user}, nil)

	if err != nil {
		app.logger.Println(err)
		http.Error(w, "The server encountered a problem and could not process your request", http.StatusInternalServerError)
	}

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
	id, err := app.readIDParam(r)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	db.DB.First(&user, id)
	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Usuario no encontrado"))
		return
	}

	db.DB.Unscoped().Delete(&user)

	w.WriteHeader(http.StatusOK)

}
