FROM node:16-alpine as client-builder


ARG REACT_APP_SERVER_PATH
ENV REACT_APP_SERVER_PATH=$REACT_APP_SERVER_PATH
COPY images /client/public/images
# WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run build



FROM unit:1.31.1-python3.11 as server-builder
COPY images /images
COPY config.json /docker-entrypoint.d/config.json
COPY --from=build-step /app/build ./build
COPY ./server ./www
WORKDIR /www
RUN pip install .
EXPOSE 8080

