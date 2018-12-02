FROM registry.gitlab.com/hmajid2301/expo-android
LABEL version=0.2.1
LABEL maintainer="hmajid2301@gmail.com"

WORKDIR /app
RUN rm -rf node_modules && \
    yarn 

ENTRYPOINT adb connect $ADB_IP && \
           yarn run android

