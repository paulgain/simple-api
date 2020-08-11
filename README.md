# Express, MySQL, JSON Web Token (JWT) and Docker
A simple REST API with basic CRUD operations on users with JWT authentication.

1. Create a user
2. Log in to generate a digitally signed JWT. 

All future requests to restricted endpoints must include the token in the HTTP Authorization request header where the signature is verified.

## Generate a public/private RSA key pair
The JWT is digitally signed with a public/private key pair using RSA.

Docker Compose's dotenv parser does not support multiline environment variables: 
https://github.com/docker/compose/issues/3527

This means we can't set both `JWT_PUBLIC_KEY` and `JWT_PRIVATE_KEY` environment variables over multiple lines. As a workaround we can base64 encode each key and copy and paste each key into a single line, the server will decode both keys when signing and verifying the token.

Run this script to generate both keys and copy and paste each key into their respective env var.

    $ ./keygen.sh

## Build the image
    $ docker build -t api:latest .

## Bring up the containers
    $ docker-compose up

## Useful Docker commands

### List all images (e.g. api, node and mysql)
    $ docker images

### List the 2 containers (api and mysql:5.7)
    $ docker ps

### Go inside the api container
    $ docker exec -it api /bin/bash

### Go inside the db container
    $ docker exec -it db /bin/bash

# Simple API

## Create a user
    curl --location --request POST 'http://localhost:3000/api/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
	    "firstname": "Foo",
	    "lastname": "Bar",
	    "dateOfBirth": "1971-01-20",
	    "emailAddress": "foo@bar.com",
	    "password": "password"
    }'

## User login (generates a token)
    curl --location --request POST 'http://localhost:3000/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "emailAddress": "foo@bar.com",
        "password": "password"
    }'  

## Fetch a single user by ID (token required)
Demonstrable purposes only as you wouldn't expose all users

    curl --location --request GET 'http://localhost:3000/api/users/1' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

## Fetch all users (token required)
Demonstrable purposes only as you wouldn't expose all users

    curl --location --request GET 'http://localhost:3000/api/users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

## Update a user by ID (token required) - TODO: add PATCH
Demonstrable purposes only as you wouldn't allow users to edit other users

    curl --location --request PUT 'http://localhost:3000/api/users/1' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>' \
    --data-raw '{
        "firstname": "Foo",
        "lastname": "Bar",
        "dateOfBirth": "1970-01-01",
        "emailAddress": "foo@bar.com"
    }'

## Delete a user by ID (token required)
Demonstrable purposes only as you wouldn't allow users to delete other users

    curl --location --request DELETE 'http://localhost:3000/api/users/1' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

## References
Introduction to JWT: [jwt.io](https://jwt.io)

The JWT open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519))
