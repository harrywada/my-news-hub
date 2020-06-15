FROM node:14.4-slim AS build
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build dist /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t
