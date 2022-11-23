migrate command

```
migrate create -seq -ext=.sql -dir=./migrations create_movies_table
```

```
migrate -path=./migrations -database="postgres://dbuser:pass1234@10.10.1.19/uptask?sslmode=disable" up   
```