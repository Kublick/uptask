package data

import (
	"time"

	"gorm.io/gorm"
)

type Usuario struct {
	gorm.Model

	ID         int64     `json:"id"`
	Nombre     string    `gorm:"not null" json:"nombre"`
	Password   string    `gorm:"not null" json:"-"`
	Email      string    `gorm:"not null;unique_index" json:"email"`
	Token      string    `json:"token"`
	Confirmado bool      `gorm:"default:false" json:"confirmado"`
	CreatedAt  time.Time `json:"created_at"`
}
