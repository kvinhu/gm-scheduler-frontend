# install OS layer to your dockerfile
FROM node:12.14-alpine3.11 as builder

# Label your dockerfile
LABEL authors="Kevin Hu khu@liveperson.com"

# install node v8 to run environment
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install
RUN yum -y install nodejs wget

# install yarn in global mode
RUN npm install -g yarn

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

# install your global dependencies
RUN yarn install && yarn cache clean

# start server and provide port that you will expose
CMD yarn start