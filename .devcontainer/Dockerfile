#-------------------------------------------------------------------------------------------------------------
#

#-------------------------------------------------------------------------------------------------------------

FROM

# Configure apt
ENV DEBIA=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recomm

# Verify git and needed tools are installed
RUN apt-get install -y git procps

# Remove outdated yarn 
# so it can be easily updated via apt-get upgrade yarn
RUN rm -rf /opt/yarn-* \
    rm -f /usr/lobin/yarn \
    rm -f /usr/lbin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn

# Install tslint and typescript
RUN npm install -g tslint typescript

# Clean up
RUN apt-get autor -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRO=dialog
