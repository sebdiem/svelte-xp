FROM node:16-alpine

RUN mkdir -p /var/app
COPY ./package.json ./package-lock.json /var/app
WORKDIR /var/app
RUN npm install

CMD npm run dev -- --host 0.0.0.0 --port 3000 --open
