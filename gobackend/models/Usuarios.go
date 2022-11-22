package models

import "gorm.io/gorm"

type Usuario struct {
	gorm.Model

	Nombre     string `gorm:"not null" json:"nombre"`
	Password   string `gorm:"not null" json:"-"`
	Email      string `gorm:"not null;unique_index" json:"email"`
	Token      string `json:"token"`
	Confirmado bool   `gorm:"default:false" json:"confirmado"`
}
