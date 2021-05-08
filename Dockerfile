FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat

# Install yarn and other dependencies via apk
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app

COPY package.json /opt/app
COPY yarn.lock /opt/app

RUN yarn

COPY . /opt/app

ENV NODE_ENV production
RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs /opt/app/.next/server/
RUN chown -R nextjs /opt/app/.next/cache/

USER nextjs

CMD yarn start
