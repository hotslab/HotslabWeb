# syntax=docker/dockerfile:1.7-labs

FROM node:20.16.0-bookworm-slim

# create the app user
ARG USERNAME=node

RUN apt-get update && DEBIAN_FRONTEND=noninteractive ACCEPT_EULA=Y apt-get install -y --fix-missing \ 
    supervisor  \
    htop \
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

COPY --chown=$USERNAME:$USERNAME ["../yarn.lock", "./"]

RUN mkdir -p supervisord/ .yarn/

RUN corepack install 

RUN yarn install --immutable --check-cache && yarn unplug tinymce

COPY --chown=$USERNAME:$USERNAME \
    --exclude=*.yml \
    --exclude=*.sh \
    --exclude=core \
    --exclude=.git \
    --exclude=.gitignore \
    --exclude=.dockerignore \
    --exclude=.env.example \
    --exclude=.env.prod \
    --exclude=.env \
    --exclude=node_modules \
    --exclude=.npm \
    --exclude=build \
    --exclude=docker \
    --exclude=.next \
    --exclude=prisma/migrations/* \
    --exclude=prisma/generated/* \
    --exclude=supervisord \
    --exclude=.vscode \
    --exclude=public/assets/libs/tinymce/* \
    --exclude=public/uploads/ \
    --exclude=.yarn \
    --exclude=.vscode \
    --exclude=hotslab_prod.tar.gz \
    ["../", "./"]

COPY --chown=$USERNAME:$USERNAME \
    --chmod=a+x \
    ["../.env.prod", "./.env"]

COPY --chown=$USERNAME:$USERNAME \
    --chmod=a+x \
    ["../open_supervisorctl.sh", "./"]

COPY --chown=$USERNAME:$USERNAME \
    --chmod=a+x \
    ["docker/entrypoint_prod.sh", "./"]

ADD ["docker/hotslab-supervisor-prod.conf", "/etc/supervisor/conf.d/hotslab-supervisor.conf"]

ENTRYPOINT [ "./entrypoint_prod.sh" ]

CMD [ "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf" ] 

