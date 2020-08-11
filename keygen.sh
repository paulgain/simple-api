#!/bin/bash

# https://www.openssl.org/docs/man1.1.1/man1/openssl-genrsa.html
# https://www.openssl.org/docs/man1.1.1/man1/openssl-rsa.html

# Generate an RSA private key
openssl genrsa -out key.pem

# Derive the public part of the private key
openssl rsa -in key.pem -pubout -out pubkey.pem

# Read the contents of both files into varaiables
PRIVATE_KEY=`cat key.pem`
PUBLIC_KEY=`cat pubkey.pem`

# Base64 encode both keys (removing all newlines)
echo "---------------------------"
echo "Base64 encoded private key "
echo "---------------------------"
echo "$(echo "$PRIVATE_KEY" | base64)"
echo
echo "---------------------------"
echo "Base64 encoded public key  "
echo "---------------------------"
echo "$(echo "$PUBLIC_KEY" | base64)"

# Cleanup
rm key.pem
rm pubkey.pem
