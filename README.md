<a href="https://gitlab.com/hmajid2301/stegappasaurus">
    <img src="src/assets/images/logo-dark.png" alt="Stegappasaurus" align="right" height="60" />
</a>

# Stegappasaurus

[![pipeline status](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/pipeline.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)
[![coverage report](https://gitlab.com/hmajid2301/stegappasaurus/badges/master/coverage.svg)](https://gitlab.com/hmajid2301/stegappasaurus/commits/master)

Stegappasaurus is an open source free mobile application, built using React Native. This application uses steganography algorithms to hide  data within images.
The project was originally conceptualised as a third year project for University. It has has since then been completely rewritten from scratch. It was originally written using Ionic/Apache Cordova.

Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The word Steganography combines the Greek words  steganos  (στεγανός), meaning "covered, concealed, or protected", and  graphein (γράφειν) meaning "writing".

The app is very simple to use simply select an image, enter your message and wait for it to encode your message with in the image. After the image has been encoded you can then share this image with other people. They can then use this app to decode the image and retrieve the original message. 


# App Demo

[![App Demo](http://i3.ytimg.com/vi/ui-dl0SVVc4/maxresdefault.jpg)](http://www.youtube.com/watch?v=ui-dl0SVVc4 "App Demo")

# Getting Started

## Installation

To setup this project on your own development machine, do the following. 

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

`.env` file should have the following variables defined (you can look at `util/generateDotEnv.sh` for an example template file).

```bash
# BUGSNAG API KEY, used for error tracking
BUGSNAG_API_KEY=xxxxx
# API Key for the `thecatapi`
CAT_API_KEY=xxx
```

# Changelog

You can find the changelog for this project [here](https://gitlab.com/hmajid2301/stegappasaurus/blob/master/CHANGELOG.md).

# Technologies Used

- React Native
- Bugsnag
- Kotlin
- TheCatAPI
- Firebase

# Other

## Credit

- App design inspired by [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)

### Images
- Cat photos from [thecatapi](https://thecatapi.com)
- Purchased stegosaurus dinosaur logo from [iconfinder](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
- Purchased [Intro Slider Images](https://www.dreamstime.com/vladwel_info)
