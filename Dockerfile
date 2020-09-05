FROM node:14.9.0

WORKDIR /usr/src/app/
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY api/** ./
COPY wait-for-it.sh .
