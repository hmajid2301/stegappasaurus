# Introduction

[![pipeline status](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/pipeline.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

[![coverage report](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/coverage.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

![logo](src/assets/images/logo-dark.png)

This is a mobile app made with React Native. The app allows user to encode and decode messages within images using
Steganography.

# Getting Started

To setup the development environment on your own machine, you can the following instructions to get setup.
To test the app you don't need to have an Firebase. But if you want to test the app
properly you may need to set these up.

## Prerequisites

- yarn/npm
- adb

## Installation

```bash
git clone https://github.com/hmajid2301/stegappasaurus.git
cd stegappasaurus
touch .env
yarn install
adb connect <device_ip>
yarn run start
# Then in another terminal
yarn run android 
```

### Example `.env` file

`.env` file should have the following variables defined (you can look at `util/generateDotEnv.sh` for an example template).

```bash
# **Optional** IP of Android Device (only used in docker container)
ADB_IP=192.168.112.101
# API Key for the `thecatapi`
CAT_API_KEY=xxx
# Firebase API URL for FAAS
FIREBASE_API_URL=https://us-central1-stegappasaurus.cloudfunctions.net
# **Optional** IP of host device where react native is running (only used in docker container)
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
```

# Technologies

Some different technologies/libraries/frameworks that were used in this project include;

- [React Native](https://facebook.github.io/react-native/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Redux](https://redux.js.org/)
- [Openapi](https://swagger.io/specification/)
- [Docker](https://www.docker.com/)

# Other

## Credit

- Design inspired by [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)

### Images
- Cat photos from [thecatapi](https://thecatapi.com)
- [Dinosaur Lottie animation](https://lottiefiles.com/2469-dino-dance), and [edited using](https://editor.lottiefiles.com/) 
- Purchased stegosaurus dinosaur logo from [iconfinder](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
- Purchased [Intro Slider Images](https://www.dreamstime.com/vladwel_info)
