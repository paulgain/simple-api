FROM node:14.9.0

WORKDIR /usr/src/app/
COPY package.json .
COPY yarn.lock .
RUN yarn -v
RUN yarn cache clean
RUN yarn

COPY . .
COPY wait-for-it.sh .
