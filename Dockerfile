FROM openjdk:8-jre

## Node.js setup
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs netcat

RUN npm config set spin false

WORKDIR /app

COPY . ./

# RUN npm install npm@latest -g && npm install

# # COPY wait-for.sh /usr/local/bin/wait-for
# # COPY entrypoint.sh /usr/local/bin/entrypoint

# RUN adduser --disabled-login --disabled-password -u 1000 node \
#   && chmod +x /app/node_modules/nightwatch/bin/nightwatch \
#   && ln -s /app/node_modules/nightwatch/bin/nightwatch /usr/local/bin/nightwatch \
#   && chown -R node /app
#   # && chown node /usr/local/bin/wait-for \
#   # && chown node /usr/local/bin/entrypoint

# USER node

RUN npm install npm@latest -g && npm install

RUN chmod +x /app/node_modules/nightwatch/bin/nightwatch \
  && ln -s /app/node_modules/nightwatch/bin/nightwatch /usr/local/bin/nightwatch

# RUN addgroup --gid 1000 node && \
#     adduser --uid 1000 --ingroup node --home /app --shell /bin/sh --disabled-password --gecos "" node && \
#     chown -R node:node /app
