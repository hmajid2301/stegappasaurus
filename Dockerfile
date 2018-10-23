FROM hmajid2301/expo-android

WORKDIR /app/stegappasaurus/
RUN yarn 

ENTRYPOINT adb connect $ADB_IP && \
           yarn run android
