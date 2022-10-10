# pull the Node.js Docker image
FROM node:16

#ENV USER=node
#ENV PATH="/home/node/.npm-global/bin:${PATH}"
#ENV NPM_CONFIG_PREFIX="/home/node/.npm-global"

#USER "${USER}"
#RUN mkdir -p "${NPM_CONFIG_PREFIX}/lib"

# create the directory inside the container
WORKDIR /var/www/app

# copy the package.json files from local machine to the workdir in container
COPY --chown=node:node ./package.json ./yarn.lock ./

#RUN npm --global config set user "${USER}" \
#  && npm --global --quiet --no-progress install \
#  && npm cache clean --force

# run npm install in our local machine
#RUN npm --global install @ionic/cli
RUN yarn install

# copy the generated modules and all other files to the container
COPY --chown=node:node ./ ./

# start command
CMD ["yarn", "start"]
