FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN yarn 
COPY . .
RUN yarn build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8000