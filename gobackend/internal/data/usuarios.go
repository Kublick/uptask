package data

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/kublick/uptask/internal/validator"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrDuplicateEmail = errors.New("duplicate email")
)

type UsuarioModel struct {
	DB *sql.DB
}

type Usuario struct {
	ID         int64     `json:"id"`
	Nombre     string    `json:"nombre"`
	Password   password  `json:"-"`
	Email      string    `json:"email"`
	Token      string    `json:"token"`
	Confirmado bool      `json:"confirmado"`
	CreatedAt  time.Time `json:"created_at"`
	Version    int       `json:"-"`
}

type password struct {
	plaintext *string
	hash      []byte
}

func ValidateUsuario(v *validator.Validator, user *Usuario) {
	v.Check(user.Nombre != "", "nombre", "Este campo es Obligatorio")

}

func (p *password) Set(plaintextPassword string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plaintextPassword), 12)
	if err != nil {
		return err
	}
	p.plaintext = &plaintextPassword
	p.hash = hash
	return nil
}

func (p *password) Matches(plaintextPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword(p.hash, []byte(plaintextPassword))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}
	return true, nil
}

func ValidateEmail(v *validator.Validator, email string) {
	v.Check(email != "", "email", "must be provided")
	v.Check(validator.Matches(email, validator.EmailRX), "email", "must be a valid email address")
}

func ValidatePasswordPlaintext(v *validator.Validator, password string) {
	v.Check(password != "", "password", "must be provided")
	v.Check(len(password) >= 8, "password", "must be at least 8 bytes long")
	v.Check(len(password) <= 72, "password", "must not be more than 72 bytes long")
}

func ValidateUser(v *validator.Validator, user *Usuario) {
	v.Check(user.Nombre != "", "nombre", "must be provided")
	v.Check(len(user.Nombre) <= 30, "nombre", "must not be more than 30 bytes long")

	ValidateEmail(v, user.Email)

	if user.Password.plaintext != nil {
		ValidatePasswordPlaintext(v, *user.Password.plaintext)
	}

	if user.Password.hash == nil {
		panic("missing password hash for user")
	}
}

func (m UsuarioModel) Insert(user *Usuario) error {
	query := `
	INSERT INTO usuarios (nombre, email, password_hash, confirmado)
	VALUES ($1, $2, $3, $4)
	RETURNING id, created_at, version`
	args := []interface{}{user.Nombre, user.Email, user.Password.hash, user.Confirmado}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&user.ID, &user.CreatedAt, &user.Version)
	if err != nil {
		switch {
		case err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"`:
			return ErrDuplicateEmail
		default:
			return err
		}
	}
	return nil
}

func (m UsuarioModel) GetById(id int64) (*Usuario, error) {
	if id < 1 {
		return nil, ErrRecordNotFound
	}

	query := `
	SELECT id, created_at, nombre, email, password_hash, confirmado, version
	FROM usuarios
	WHERE id = $1`
	var user Usuario

	err := m.DB.QueryRow(query, id).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.Nombre,
		&user.Email,
		&user.Password.hash,
		&user.Confirmado,
		&user.Version,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	return &user, nil
}

func (m UsuarioModel) GetByEmail(email string) (*Usuario, error) {
	query := `
	SELECT id, created_at, nombre, email, password_hash, confirmado, version
	FROM users
	WHERE email = $1`
	var user Usuario
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := m.DB.QueryRowContext(ctx, query, email).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.Nombre,
		&user.Email,
		&user.Password.hash,
		&user.Confirmado,
		&user.Version,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	return &user, nil
}

func (m UsuarioModel) Update(user *Usuario) error {
	query := `
	UPDATE users
	SET name = $1, email = $2, password_hash = $3, activated = $4, version = version + 1
	WHERE id = $5 AND version = $6
	RETURNING version`
	args := []interface{}{
		user.Nombre,
		user.Email,
		user.Password.hash,
		user.Confirmado,
		user.ID,
		user.Version,
	}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&user.Version)
	if err != nil {
		switch {
		case err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"`:
			return ErrDuplicateEmail

		case errors.Is(err, sql.ErrNoRows):
			return ErrEditConflict
		default:
			return err
		}
	}
	return nil
}
