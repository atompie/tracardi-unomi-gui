FROM node:10.24.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public

RUN yarn install
COPY . ./
RUN yarn build

# Production environment
FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=build /app/build /usr/share/nginx/html

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

# Add bash
RUN apk add --no-cache bash

RUN ls -l /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
