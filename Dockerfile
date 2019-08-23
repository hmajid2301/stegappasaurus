FROM reactnativecommunity/react-native-android

WORKDIR /app
ENV ADB_IP="192.168.1.1"
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.2"
COPY package.json yarn.lock tsconfig.json android ./

RUN yarn && \ 
    adb connect $ADB_IP
CMD ls -l && yarn run android