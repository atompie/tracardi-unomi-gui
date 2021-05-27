# build environment
FROM node:10.24.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY src ./src
COPY public ./public
#RUN ls -l ./
RUN yarn install
COPY . ./
RUN yarn build
#RUN ls -l ./

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
#RUN ls -l /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
