#!/bin/bash

# -------------------------------------------
# Make commands
# -------------------------------------------
# make create-user 
# make user-login         (generates a token)
# make get-user id=1      (requires a token)
# make get-users          (requires a token)
# make update-user id=1   (requires a token)
# make delete-user id=1   (requires a token)

token = "<token.goes.here>"
api-root = "http://localhost:3000"

create-user:
	curl --location --request POST "${api-root}/api/users" \
	  --header 'Content-Type: application/json' \
	  --data-raw '{ \
	    "firstname": "Foo", \
	    "lastname": "Bar", \
	    "dateOfBirth": "1971-01-20", \
	    "emailAddress": "foo@bar.com", \
	    "password": "password" \
	  }' \

user-login:
	curl --location --request POST "${api-root}/login" \
	  --header 'Content-Type: application/json' \
	  --data-raw '{ \
	    "emailAddress": "foo@bar.com", \
	    "password": "password" \
	  }'

get-user:
	curl --location --request GET "${api-root}/api/users/$(id)" \
	  --header 'Content-Type: application/json' \
	  --header "Authorization: Bearer ${token}"

get-users:
	curl --location --request GET "${api-root}/api/users" \
	  --header 'Content-Type: application/json' \
	  --header "Authorization: Bearer ${token}"

update-user:
	curl --location --request PUT "${api-root}/api/users/$(id)" \
	  --header 'Content-Type: application/json' \
	  --header "Authorization: Bearer ${token}" \
	  --data-raw '{ \
	    "firstname": "Foo", \
	    "lastname": "Bar", \
	    "dateOfBirth": "1970-01-01", \
	    "emailAddress": "foo@bar.com" \
	  }'

delete-user:
	curl --location --request DELETE "${api-root}/api/users/$(id)" \
	  --header 'Content-Type: application/json' \
	  --header "Authorization: Bearer ${token}"