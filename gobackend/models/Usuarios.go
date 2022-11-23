package models

import (
	"github.com/kublick/uptask/internal/validator"
	"gorm.io/gorm"
)

type Usuario struct {
	gorm.Model
	Nombre     string `gorm:"not null" json:"nombre"`
	Password   string `gorm:"not null" json:"password"`
	Email      string `gorm:"not null;unique_index" json:"email"`
	Token      string `json:"token"`
	Confirmado bool   `gorm:"default:false" json:"confirmado"`
}

func ValidateUsuario(v *validator.Validator, user *Usuario) {
	v.Check(user.Nombre != "", "nombre", "Este campo es Obligatorio")
	v.Check(user.Password != "", "password", "Este campo es Obligatorio")

}
