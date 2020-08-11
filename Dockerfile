FROM node:14.5.0
WORKDIR /usr/src/app
COPY . .
RUN yarn
