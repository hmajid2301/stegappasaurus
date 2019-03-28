import { https } from "firebase-functions";

import Steganography from "./steganography";

export const encode = https.onRequest((request, response) => {
  const imageData = request.body.imageData;
  const algorithm = request.body.algorithm;
  const message = request.body.message;

  const encodedImage = new Steganography(algorithm, imageData).encode(message);
  response.send(encodedImage);
});

export const decode = https.onRequest((request, response) => {
  const imageData = request.body.imageData;
  const algorithm = request.body.algorithm;

  const decodedMessage = new Steganography(algorithm, imageData).decode();
  response.send(decodedMessage);
});
