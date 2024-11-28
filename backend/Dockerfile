FROM node:14 

WORKDIR /app

COPY package.json ./*

RUN npm install-g nodemon

COPY . .

EXPOSE 5000

CMD ["nodemon", "index.js"]