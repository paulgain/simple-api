# Express, MySQL, JSON Web Token (JWT) and Docker
_A simple REST API with basic CRUD operations on users with JWT authentication._

# Table of Contents

- [Copy sample.env](#copy-sampleenv)
- [Create the Keys](#create-the-keys)
- [Docker commands](#docker-commands)
- [API usage](#api-usage)
  - [Create a user](#create-a-user)
  - [User login](#user-login)
  - [Get a user](#get-a-user)
  - [Get all users](#get-all-users)
  - [Update a user](#update-a-user)
  - [Delete a user](#delete-a-user)
- [References](#references)

## Copy sample.env

    $ cp sample.env .env

## Create the keys
In order to sign and verify the JWT we need to create a public/private RSA key pair. These keys are then added as environment variables to `.env`

Known issue: Docker Compose's dotenv parser does not support multiline environment variables: 
https://github.com/docker/compose/issues/3527

This means we can't set both `JWT_PUBLIC_KEY` and `JWT_PRIVATE_KEY` environment variables over multiple lines. As a workaround we can base64 encode each key and copy and paste each key into a single line, the server will decode both keys on initialization ready for signing and verifying tokens later.

Run this script to generate both keys and copy and paste each key into their respective environment variable within `.env`
    
    $ ./keygen.sh

## Docker commands
Build the images
    
    $ docker build -t api:latest .

Bring up the containers

    $ docker-compose up

List all images (e.g. api, node and mysql)

    $ docker images

List the 2 containers (api and mysql:5.7)
    
    $ docker ps

Go inside the api container

    $ docker exec -it api /bin/bash

Go inside the db container
    
    $ docker exec -it db /bin/bash

## API usage
1. Create a user
2. Login to generate a digitally signed JWT (the token)
3. Call one of the protected endpoints with the token

### Create a user
    curl --location --request POST 'http://localhost:3000/api/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
	    "firstname": "Foo",
	    "lastname": "Bar",
	    "dateOfBirth": "1971-01-20",
	    "emailAddress": "foo@bar.com",
	    "password": "password"
    }'

### User login 
This generates the token:

    curl --location --request POST 'http://localhost:3000/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "emailAddress": "foo@bar.com",
        "password": "password"
    }'  

### Get a user
Demonstrable purposes only as you wouldn't expose all users

    curl --location --request GET 'http://localhost:3000/api/users/1' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

### Get all users
Demonstrable purposes only as you wouldn't expose all users

    curl --location --request GET 'http://localhost:3000/api/users' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

### Update a user
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

### Delete a user
Demonstrable purposes only as you wouldn't allow users to delete other users

    curl --location --request DELETE 'http://localhost:3000/api/users/1' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <token.goes.here>'

## References
Introduction to JWT: [jwt.io](https://jwt.io)

The JWT open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519))
