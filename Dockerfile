FROM node:20.11.1-alpine3.19
WORKDIR node-app
COPY package*.json ./
RUN npm install

Run npm install puppeteer

COPY . .
//RUN npm run test
EXPOSE 3000
CMD ["npm", "start"]

