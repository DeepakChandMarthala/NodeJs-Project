FROM node:20.11.1-alpine3.19
WORKDIR node-app
COPY package*.json ./
RUN npm install
RUN npm install axios assert
COPY . .
RUN npm run test
EXPOSE 3000
CMD ["npm", "start"]

