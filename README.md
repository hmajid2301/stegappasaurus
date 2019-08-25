<a href="https://gitlab.com/stegappasaurus/stegappasaurus-app">
    <img src="src/assets/images/logo-dark.png" alt="Stegappasaurus Logo" title="Stegappasaurus" align="right" height="60" />
</a>

# Stegappasaurus Mobile Application

[![pipeline status](https://gitlab.com/stegappasaurus/stegappasaurus-app/badges/master/pipeline.svg)](https://gitlab.com/stegappasaurus/stegappasaurus-app/commits/master)
[![coverage report](https://gitlab.com/stegappasaurus/stegappasaurus-app/badges/master/coverage.svg)](https://gitlab.com/stegappasaurus/stegappasaurus-app/commits/master)


Stegappasaurus is a free mobile application fully open source, built using React Native. This application uses steganography algorithms to hide your (text) data within images.
This project was originally created as third year project for University. However this version is a complete rewrite of the application.

Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The word Steganography combines the Greek words  steganos  (στεγανός), meaning "covered, concealed, or protected", and  graphein (γράφειν) meaning "writing".

You use the app to select an image, enter your message and wait for it to encode your image. After the image has been encoded you can then share it with others. They can then use the app to decode the image and retrieve the original encoded message. You can share images using any platform you like, such as Whatsapp, Facebook, Email etc.
The encoded images look identical to normal images to the naked eye you cannot tell the difference between them.

This app relies on using a RESTful API which runs on Google Firebase to do the encoding and decoding.
The project which contains the code for this API exists [here](https://github.com/stegappasaurus/stegappasaurus-api.git).

[![android play store](https://play.google.com/intl/en_gb/badges/images/generic/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.stegappasaurus&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

# App Demo

[![App Demo](http://img.youtube.com/vi/ui-dl0SVVc4/0.jpg)](http://www.youtube.com/watch?v=ui-dl0SVVc4 "App Demo")

# Getting Started

## Installation

To setup this project on your own development machine, do the following. 

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

To setup Firebase (Firebase Cloud Functions) component which runs the RESTful API which applies the Steganography algorithms. For more information about this project click [here](https://github.com/stegappasaurus/stegappasaurus-api.git)

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
# BUGSNAG API KEY, used for error tracking
BUGSNAG_API_KEY=xxxxx
# API Key for the `thecatapi`
CAT_API_KEY=xxx
# Firebase API URL, used for FAAS
FIREBASE_API_URL=https://xxxx.net/api
# **Optional** IP of host device where react native is running (only used in docker container)
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.27.1
# Timber API Key, used for logging
TIMBER_API_KEY=xxx
# Timber Source ID, used for logging
TIMBER_SOURCE_ID=xxx

```

# Changelog

You can find the changelog for this project [here](https://gitlab.com/stegappasaurus/stegappasaurus-app/blob/master/CHANGELOG.md).

# Other

## Credit

- App design inspired by [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)

### Images
- Cat photos from [thecatapi](https://thecatapi.com)
- [Dinosaur Lottie animation](https://lottiefiles.com/2469-dino-dance), and [edited using](https://editor.lottiefiles.com/) 
- Purchased stegosaurus dinosaur logo from [iconfinder](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
- Purchased [Intro Slider Images](https://www.dreamstime.com/vladwel_info)
- [GitLab Project Logo](https://www.flaticon.com/authors/smashicon)
