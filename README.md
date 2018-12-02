# Introduction

Steg![Logo](src/assets/images/logo.png)ppasaurus

This is a mobile app made with React Native and Expo. The app allows user to encode and decode messages within images using
Steganography. This is a rewrite of my dissertation project, written in my third year of university. It includes more features
such as;

* Share Encoded Images
* Encode/Decode JPEGs and GIFs

## Getting Started

### With Docker :whale:

```bash
git clone https://github.com/hmajid2301/stegappasaurus.git
cd stegappasaurus
touch .env
docker-compose up --build -d
```

### Without Docker :no_entry: :whale:

```bash
git clone https://github.com/hmajid2301/stegappasaurus.git
cd stegappasaurus
touch .env
yarn
yarn run android
```

#### Example `.env` file

`.env` file should have the following variables defined

```bash
ADB_IP=192.168.112.101
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
```

## Other

### Licenses :copyright:

* Purchased stegstegosaurus dinosaur logo from [here](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
