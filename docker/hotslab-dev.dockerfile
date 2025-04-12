# syntax=docker/dockerfile:1.7-labs

FROM node:20.16.0-bookworm-slim

# create the app user
ARG USERNAME=node

RUN apt-get update && DEBIAN_FRONTEND=noninteractive ACCEPT_EULA=Y apt-get install -y --fix-missing \ 
    supervisor  \
    git \ 
    htop \
    curl \
    nano

RUN npm config rm proxy && \
    npm config rm https-proxy && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-timeout 420000 && \
    npm i --maxsockets 3 --loglevel verbose -g serve
    # && npm update -g --loglevel verbose --maxsockets 3

RUN corepack enable

WORKDIR /app

RUN chown -R $USERNAME:$USERNAME ./

USER $USERNAME

COPY --chown=$USERNAME:$USERNAME ["../package*.json", "./"]

RUN corepack install 

RUN yarn install && yarn unplug tinymce

ADD ["docker/hotslab-supervisor-dev.conf", "/etc/supervisor/conf.d/hotslab-supervisor.conf"]

RUN mkdir -p supervisord/


ENTRYPOINT [ "docker/entrypoint_dev.sh" ]

CMD [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf" ] 
