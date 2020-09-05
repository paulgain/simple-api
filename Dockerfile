FROM node:14.5.0
WORKDIR /usr/src/app/

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY src/** ./
COPY wait-for-it.sh .
