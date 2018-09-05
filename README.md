# Introduction

This is a mobile app made with React Native and Expo. The app allows user to encode and decode messages within images using
Steganography. This is a rewrite of my dissertation project, written in my third year of university.

# Getting Started

## a) With Docker (:whale:)

Assuming the following are installed;

    * Android Simulator (Genymotion)
    * Docker/Docker Compose

```bash
git clone https://github.com/hmajid2301/Stegappasaurus.git
cd Stegappasaurus
touch .env
docker-compose up --build -d
```

## b) Without Docker (:no_entry: :whale:)

Assuming the following are installed;

    * Android Simulator (Genymotion)
    * Yarn

```bash
git clone https://github.com/hmajid2301/Stegappasaurus.git
cd Stegappasaurus
touch .env
yarn
npm android
```

## Example `.env` file

`.env` file should have the following variables defined
 
```bash
EXPO_USERNAME="username"
EXPO_PASSWORD="password"
ADB_IP="device_ip"
```

# Debugging (:no_entry: :bug:)

## WebStorm

![](docs/debugger.png)

Where package.json contains `"start": "exp start"`.

Also make sure "Remote Debugging" is switched on. In the Expo app in 
`CTRL + M` to open the following menu.

![](docs/remote-debugging.png)

1) Run above configuration in debug mode
2) Then run `exp android` (as normal)

Now you can add breakpoints and use the WebStorm debugger as you normally would.
    
# Other

## Open Genymotion Emulator from CLI

To open the android emulator from cli, you can use the following command.

`` ~/genymotion/player --vm-name "Google Pixel - 8.0 - API 26 - 1080x1920"``. 

To get the name of your devices run the following command; ``VBoxManage list vms``.



### Licenses :copyright:

Purchased steg dino logo from here: 
 * https://www.iconfinder.com/icons/380124/animal_big_experience_dino_paleontology_reptile_stegosaurus_zababa_icon#size=512

Test images taken form Pexel:
 * https://www.pexels.com/photo/rock-formation-near-body-of-water-800244/ (Photo by Sindre Strøm from Pexels)
 * https://www.pexels.com/photo/clouds-daylight-lake-landscape-179847/ (Photo by Ghost Presenter from Pexels)
 * https://www.pexels.com/photo/clouds-daylight-hd-wallpaper-high-448714/ (Photo by eberhard grossgasteiger from Pexels)
 * https://www.pexels.com/photo/adventure-beach-coast-daylight-457044/ (Photo by eberhard grossgasteiger from Pexels)