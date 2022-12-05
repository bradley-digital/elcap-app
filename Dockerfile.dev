# pull the Node.js Docker image
FROM node:16

# create the directory inside the container
WORKDIR /var/www/app

# copy the package.json files from local machine to the workdir in container
COPY --chown=node:node ./package.json ./yarn.lock ./

# run npm install in our local machine
RUN yarn install

# copy the generated modules and all other files to the container
COPY --chown=node:node ./ ./

# start command
CMD ["yarn", "build"]
