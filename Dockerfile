FROM node:alpine

RUN apk add --no-cache git openssh

RUN mkdir /app

WORKDIR /app

# COPY yarn*.lock ./

COPY package*.json ./

RUN npm install 

# COPY .env ./

COPY tsconfig.json ./

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]