package main

import (
	"fmt"
	"net/http"

	"github.com/kublick/uptask/internal/data"
)

func (app *application) createUserHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Nombre   string `json:"nombre"`
		Password string `json:"password"`
		Email    string `json:"email"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}
	fmt.Fprintf(w, "%+v\n", input)
}

func (app *application) getUserHandler(w http.ResponseWriter, r *http.Request) {

	id, err := app.readIDParam(r)
	if err != nil {
		app.notFoundResponse(w, r)

		return
	}

	usuario := data.Usuario{
		ID:       id,
		Nombre:   "John Doe",
		Password: "El Pass Secreto",
		Email:    "Un Pinche Email Culero",
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"usuario": usuario}, nil)
	if err != nil {
		app.logger.Println(err)
		app.serverErrorResponse(w, r, err)
	}

}

func (app *application) updateUserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "update a user")
}

func (app *application) deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "delete a user")
}
