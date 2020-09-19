FROM node:14.9.0

WORKDIR /usr/src/app/
COPY package.json .
COPY yarn.lock .
RUN yarn install --ignore-optional

COPY . .
COPY wait-for-it.sh .
