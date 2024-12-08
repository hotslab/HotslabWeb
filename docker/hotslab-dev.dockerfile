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

RUN npm i --maxsockets 3 --loglevel verbose -g serve --fetch-timeout 420000 \ 
    && npm update -g --loglevel verbose --maxsockets 3

WORKDIR /app

RUN chown -R $USERNAME:$USERNAME ./

USER $USERNAME

COPY --chown=$USERNAME:$USERNAME ["../package*.json", "./"]

RUN npm i --maxsockets 3 --loglevel verbose --cache ./.npm --fetch-timeout 420000

ADD ["docker/hotslab-supervisor-dev.conf", "/etc/supervisor/conf.d/hotslab-supervisor.conf"]

RUN mkdir -p supervisord/

ENTRYPOINT [ "docker/entrypoint_dev.sh" ]

CMD [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf" ] 
