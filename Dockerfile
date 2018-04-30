# Based on the following two projetcts;
# 1) Install java8 -> https://github.com/William-Yeh/docker-java8/blob/master/Dockerfile
# 2) Install android -> https://github.com/bitrise-docker/android/blob/master/Dockerfile

FROM node:latest
MAINTAINER hmajid2301@gmail.com

EXPOSE 19000:19000
EXPOSE 19001:19001

#Set environment variables
ARG WORK_DIR=/opt/Stegappasaurus
ENV NODE_MODULES_HOME ${WORK_DIR}/node_modules/.bin
ENV ANDROID_HOME /opt/android
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${NODE_MODULES_HOME}
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle/

# Install JAVA8
RUN echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee /etc/apt/sources.list.d/webupd8team-java.list  && \
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list  && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886  && \
    apt-get update && \
    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections  && \
    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections  && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes oracle-java8-installer oracle-java8-set-default && \
    rm -rf /var/cache/oracle-jdk8-installer

# Install Maven & Gradle
RUN apt-get update -qq && \
    dpkg --add-architecture i386 && \
    apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y libc6:i386 libstdc++6:i386 libgcc1:i386 libncurses5:i386 libz1:i386 && \
    apt-get update && \
    apt-get -y install gradle && \
    apt-get -y purge maven maven2 && \
    apt-get update && \
    apt-get -y install maven

# Install Android SDK
RUN mkdir /opt/Stegappasaurus/ && \
    cd /opt && \
    wget -q https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O android-tools.zip && \
    unzip -q android-tools.zip -d ${ANDROID_HOME} && \
    rm android-tools.zip && \
    yes | sdkmanager --licenses && \
    sdkmanager "emulator" "tools" "platform-tools" && \
    yes | sdkmanager \
    "platforms;android-27" \
    "platforms;android-26" \
    "platforms;android-23" \
    "build-tools;27.0.0" \
    "build-tools;26.0.0" \
    "build-tools;23.0.1" \
    "extras;android;m2repository" \
    "extras;google;m2repository" \
    "extras;google;google_play_services" \
    "extras;m2repository;com;android;support;constraint;constraint-layout;1.0.1" \
    "add-ons;addon-google_apis-google-23" && \
    apt-get clean  && \
    rm -rf /var/lib/apt/lists/*

# Install yarrn packages
WORKDIR ${WORK_DIR}
COPY package.json yarn.lock ./
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    sudo apt-get update && sudo apt-get install yarn
RUN yarn install --production

# Start Expo
COPY app.json ./
ENTRYPOINT exp login --non-interactive -u $EXPO_USERNAME -p $EXPO_PASSWORD && \
           adb connect $ADB_IP && \
           npm run android
