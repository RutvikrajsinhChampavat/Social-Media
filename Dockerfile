FROM node:latest
WORKDIR /usr/social/auth

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]
 