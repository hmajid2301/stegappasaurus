# Introduction

[![pipeline status](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/pipeline.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

[![coverage report](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/coverage.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

![logo](src/assets/images/logo-dark.png)

This is a mobile app made with React Native and Expo. The app allows user to encode and decode messages within images using
Steganography. This is a rewrite of my dissertation project, written in my third year of university.

## Getting Started

To setup the development environment on your own machine, you can the following instructions to get setup.
To test the app you don't need to have an Firebase or Sentry account. But if you want to test the app
properly you may need to set these up.

### Prerequisites

- yarn/npm
- docker (optional)
- Firebase Account
- Sentry Account

### With :whale: Docker

```bash
git clone https://github.com/hmajid2301/stegappasaurus.git
cd stegappasaurus
touch .env
docker-compose up --build -d
```

### Without :no_entry: :whale: Docker

```bash
git clone https://github.com/hmajid2301/stegappasaurus.git
cd stegappasaurus
touch .env
yarn
yarn android
```

#### Example `.env` file

`.env` file should have the following variables defined

```bash
# IP of Android Device
ADB_IP=192.168.112.101
# IP of host device where react native is running
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
# API to `thecatapi`, https://thecatapi.com/
CAT_API_KEY=xxx
# Firebase API Key, https://stackoverflow.com/questions/13863297/firebase-what-is-the-api-key/37995239
FIREBASE_API_KEY=xxx
# Firebase URL to make API requests
FIREBASE_API_URL=https://us-central1-stegappasaurus.cloudfunctions.net/api
# Sentry API Token, https://docs.expo.io/versions/latest/guides/using-sentry/
SENTRY_API_TOKEN=xxx
# Sentry API Token, https://docs.expo.io/versions/latest/guides/using-sentry/
SENTRY_PUBLIC_DSN=https://xxx@sentry.io/1427565
```

## Errors

Any errors in your editor about paths not resolving take a look [here](https://github.com/tleunen/babel-plugin-module-resolver#eslint-plugin).

## Technologies

- React Native
- Expo
- Redux
- TypeScript
- Firebase
- Express
- Openapi
- Sentry
- Docker

## Other

### Credit

- Design Inspired by: [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)
- Cat Photos from [thecatapi](https://thecatapi.com)

### Licenses

- Purchased stegosaurus dinosaur logo from [here](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
