FROM node:14

WORKDIR /todo-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 3030
