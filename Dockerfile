# BUILDER IMAGE
FROM node:18.12.1-buster AS builder
ENV NODE_PATH=.
WORKDIR /usr/src/app

# important, otherwise postinstall hook fails
RUN npm set unsafe-perm=true
RUN npm set progress=false
RUN npm set loglevel=error
# copy all relevant files
COPY . .
# install dependencies
RUN npm ci
# compile typescript
RUN npm run build

# MAIN IMAGE
FROM node:18.12.1-buster-slim
ENV NODE_PATH=dist
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
EXPOSE 3000
USER node
CMD [ "node", "-r", "source-map-support/register", "dist/index.js"]
