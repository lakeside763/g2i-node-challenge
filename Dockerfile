FROM node:14.19.1-alpine
LABEL author="Moses Idowu"

ARG PACKAGES=nano

RUN apk update && apk add $PACKAGES

WORKDIR /app
COPY ./package.json ./
COPY yarn.lock ./
RUN yarn install

COPY prisma/schema.prisma ./prisma/
COPY prisma/database_config.json ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 6000

CMD ["yarn", "start"]
