# syntax=docker/dockerfile:1.7-labs

FROM node:20.16.0-bookworm-slim

# create the app user
ARG USERNAME=node

RUN apt-get update && DEBIAN_FRONTEND=noninteractive ACCEPT_EULA=Y apt-get install -y --fix-missing \ 
    supervisor  \
    htop \
    nano

RUN npm i --maxsockets 3 --loglevel verbose -g serve --fetch-timeout 420000 \ 
    && npm update -g --loglevel verbose --maxsockets 3

WORKDIR /app

RUN chown -R $USERNAME:$USERNAME ./

USER $USERNAME

COPY --chown=$USERNAME:$USERNAME ["../package*.json", "./"]

RUN mkdir -p supervisord/ .npm/

RUN npm ci --maxsockets 3 --loglevel verbose --cache ./.npm --fetch-timeout 420000

COPY --chown=$USERNAME:$USERNAME \
    --exclude=*.yml \
    --exclude=*.sh \
    --exclude=core \
    --exclude=.git \
    --exclude=.gitignore \
    --exclude=.dockerignore \
    --exclude=.env.example \
    --exclude=node_modules \
    --exclude=.npm \
    --exclude=build \
    --exclude=docker \
    --exclude=.next \
    --exclude=prisma/migrations/* \
    --exclude=supervisord \
    --exclude=.vscode \
    --exclude=public/assets/libs/tinymce/* \
    ["../", "./"]

COPY --chown=$USERNAME:$USERNAME \
    --chmod=a+x \
    ["../open_supervisorctl.sh", "./"]

COPY --chown=$USERNAME:$USERNAME \
    --chmod=a+x \
    ["docker/entrypoint_prod.sh", "./"]

ADD ["docker/hotslab-supervisor-prod.conf", "/etc/supervisor/conf.d/hotslab-supervisor.conf"]

ENTRYPOINT [ "./entrypoint_prod.sh" ]

CMD [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf" ] 

