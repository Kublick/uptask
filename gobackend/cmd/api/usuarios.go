package main

import (
	"errors"
	"net/http"

	"github.com/kublick/uptask/internal/data"
	"github.com/kublick/uptask/internal/validator"
)

func (app *application) RegisterUserHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Nombre   string `json:"nombre"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	user := &data.Usuario{
		Nombre:     input.Nombre,
		Email:      input.Email,
		Confirmado: false,
	}

	err = user.Password.Set(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	v := validator.New()

	if data.ValidateUser(v, user); !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	err = app.models.Usuarios.Insert(user)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrDuplicateEmail):
			v.AddError("email", "a user with this email address already exists")
			app.failedValidationResponse(w, r, v.Errors)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}
	err = app.writeJSON(w, http.StatusAccepted, envelope{"usuario": user}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

// func (app *application) UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
// 	w.Write([]byte("Update User"))
// }

// func (app *application) DeleteUserHandler(w http.ResponseWriter, r *http.Request) {

// 	var user models.Usuario
// 	id, err := app.readIDParam(r)
// 	if err != nil {
// 		http.NotFound(w, r)
// 		return
// 	}

// 	db.DB.First(&user, id)
// 	if user.ID == 0 {
// 		w.WriteHeader(http.StatusNotFound)
// 		w.Write([]byte("Usuario no encontrado"))
// 		return
// 	}

// 	db.DB.Unscoped().Delete(&user)

// 	w.WriteHeader(http.StatusOK)

// }
