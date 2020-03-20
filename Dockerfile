# install OS layer to your dockerfile
FROM node:12.14-alpine3.11 as builder

# Label your dockerfile
LABEL authors="Kevin Hu khu@liveperson.com"

# set app folder env variables - as per standard it should follow /liveperson/code/name_of_project
ENV LP_HOME="/liveperson"
ENV APP_CODE="${LP_HOME}/code/na-gm_scheduler-frontend"

# create folder where application will be running
RUN mkdir -p ${APP_CODE}

# change working dir
WORKDIR ${APP_CODE}

# install external dependencies
#COPY package.json ${APP_CODE}

# copy files that are required for the app to work - modify the lines accordingly
COPY . . 

# install your global dependencies and build
RUN yarn install && yarn cache clean && yarn build