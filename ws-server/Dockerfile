FROM node:16.20.0-alpine
WORKDIR '/app'
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "index.js" ]