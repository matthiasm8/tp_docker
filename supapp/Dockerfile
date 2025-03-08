FROM node:20.18.0

COPY deploy.sh /deploy.sh

COPY package.json /package.json

RUN chmod +x /deploy.sh
RUN chmod +x /package.json

CMD [ "npm","run","dev" ]
