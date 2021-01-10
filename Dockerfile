FROM nginx:1.19.5-alpine
COPY . /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
