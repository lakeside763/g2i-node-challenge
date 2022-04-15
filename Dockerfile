FROM node:12.22-alpine
LABEL author="Moses Idowu"

ARG PACKAGES=nano

RUN apk update && apk add $PACKAGES

WORKDIR /app
COPY package.json /app/
COPY yarn.lock ./app/
RUN yarn install

COPY prisma/schema.prisma ./prisma/
COPY prisma/database_config.json ./prisma/

RUN npx prisma generate

COPY . /app/

EXPOSE 6000

CMD ["yarn", "start"]
