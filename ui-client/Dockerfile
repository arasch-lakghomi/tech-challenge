FROM node:16.20.0-alpine as builder
WORKDIR '/app'
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.25
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ui-client /usr/share/nginx/html
EXPOSE 80