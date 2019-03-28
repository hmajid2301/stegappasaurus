# Introduction

[![pipeline status](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/pipeline.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

[![coverage report](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/coverage.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

![logo](src/assets/images/logo-dark.png)

This is a mobile app made with React Native and Expo. The app allows user to encode and decode messages within images using
Steganography. This is a rewrite of my dissertation project, written in my third year of university.

## Getting Started

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
ADB_IP=192.168.112.101
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
```

## Errors

Any errors in your editor about paths not resolving take a look [here](https://github.com/tleunen/babel-plugin-module-resolver#eslint-plugin).

## Technologies

Some technologies/libraries used in this project include;

- React Native
- Expo
- TypeScript
- Firebase
- Docker

## Other

### Credit

- Design Inspired by: [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)
- Cat Photos from [thecatapi](https://thecatapi.com)

### Licenses

- Purchased stegosaurus dinosaur logo from [here](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
