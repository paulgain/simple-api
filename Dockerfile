FROM node:13.0.0

WORKDIR /usr/src/app/
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
COPY wait-for-it.sh .
