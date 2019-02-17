<p align="center">
<a href="https://gitlab.com/hmajid2301/stegappasaurus/commits/master" alt="coverage report">
    <img src="https://gitlab.com/hmajid2301/stegappasaurus/badges/master/coverage.svg"/>
</a>

<a href="https://gitlab.com/hmajid2301/stegappasaurus/commits/master" alt="pipeline status">
    <img src="https://gitlab.com/hmajid2301/stegappasaurus/badges/master/pipeline.svg"/>
</a>

<a href="https://snyk.io/test/github/hmajid2301/stegappasaurus" alt="Known Vulnerabilities">
    <img src="https://snyk.io/test/github/hmajid2301/stegappasaurus/badge.svg"/>
</a>

<a href="https://app.fossa.io/projects/git%2Bgitlab.com%2Fhmajid2301%2Fstegappasaurus?ref=badge_shield" alt="Licenses">
    <img src="https://app.fossa.io/api/projects/git%2Bgitlab.com%2Fhmajid2301%2Fstegappasaurus.svg?type=shield"/>
</a>
</p>

<p align="center">
    <img src="src/assets/images/logo-dark.png">
</p>

# Introduction

This is a mobile app made with React Native and Expo. The app allows user to encode and decode messages within images using
Steganography. This is a rewrite of my dissertation project, written in my third year of university.

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

## Errors

Any errors in your editor about paths not resolving take a look [here](https://github.com/tleunen/babel-plugin-module-resolver#eslint-plugin).

## Other

Design Inspired by: [PixelKnot](https://play.google.com/store/apps/details?id=info.guardianproject.pixelknot)

### Licenses :copyright:

- Purchased stegosaurus dinosaur logo from [here](https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512)
