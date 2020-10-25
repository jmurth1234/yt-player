FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
RUN npm install -g yarn
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app

COPY package.json /opt/app
COPY package-lock.json /opt/app

RUN yarn

COPY . /opt/app

RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "npm", "start" ]