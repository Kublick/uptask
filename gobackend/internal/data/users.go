package data

type Usuario struct {
	// ID         primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	ID         int64  `json:"id"`
	Nombre     string `json:"nombre"`
	Password   string `json:"-"`
	Email      string `json:"email"`
	Token      string `json:"token"`
	Confirmado string `json:"confirmado"`
}
