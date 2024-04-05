FROM node:20.12.1-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20.12.1-alpine3.19

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY employees.csv ./

EXPOSE 3000

CMD [ "node", "dist/app.js" ]
