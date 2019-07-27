# Stegappasaurus Mobile Application

[![pipeline status](https://gitlab.com/stegappasaurus/stegappasaurus-app/badges/master/pipeline.svg)](https://gitlab.com/stegappasaurus/stegappasaurus-app/commits/master)

[![coverage report](https://gitlab.com/stegappasaurus/stegappasaurus-app/badges/master/coverage.svg)](https://gitlab.com/stegappasaurus/stegappasaurus-app/commits/master)

![logo](src/assets/images/logo-dark.png)

This is a mobile app made with React Native. The app allows user to encode and decode messages within images using Steganography.

# Getting Started

To setup the development environment on your own machine, you can the following instructions to get setup.

## Installation

To setup the app

```bash
git clone https://github.com/stegappasaurus/stegappasaurus-app.git
cd stegappasaurus
touch .env
yarn install
adb connect <device_ip>
yarn run start
# Then in another terminal
yarn run android 
```

To setup firebase

```bash
git clone https://github.com/stegappasaurus/stegappasaurus-api.git
yarn
vim .runtimeconfig.json
{
    "env": {
        "production": "false"
    }
}
yarn run firebase-emulator
```

This should give a url like `http://localhost:5001/stegappasaurus/us-central1/api` use this as
`FIREBASE_API_URL` in the `.env`.

**NOTE:** To test your changes makes sure you compile your code into Javascript.
You can run `yarn run firebase-build` from the root directory, or you can setup 
some sort of compile on save.

### Example `.env` file

`.env` file should have the following variables defined (you can look at `util/generateDotEnv.sh` for an example template).

```bash
# **Optional** IP of Android Device (only used in docker container)
ADB_IP=192.168.112.101
# API Key for the `thecatapi`
CAT_API_KEY=xxx
# Firebase API URL for FAAS
FIREBASE_API_URL=https://xxxx.net/api
# **Optional** IP of host device where react native is running (only used in docker container)
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
```

# Other

## Credit

- Design inspired by [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)

### Images
- Cat photos from [thecatapi](https://thecatapi.com)
- [Dinosaur Lottie animation](https://lottiefiles.com/2469-dino-dance), and [edited using](https://editor.lottiefiles.com/) 
- Purchased stegosaurus dinosaur logo from [iconfinder](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
- Purchased [Intro Slider Images](https://www.dreamstime.com/vladwel_info)
- [GitLab Project Logo](https://www.flaticon.com/authors/smashicon)
