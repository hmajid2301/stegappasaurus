import * as express from "express";
import { https } from "firebase-functions";

import validateToken from "./middleware/Token";
import Steganography from "./steganography";

const app = express();
app.use(validateToken);

app.post(
  "/api/encode",
  (request: express.Request, response: express.Response) => {
    const imageData = request.body.imageData;
    const algorithm = request.body.algorithm;
    const message = request.body.message;

    const encodedImage = new Steganography(algorithm, imageData).encode(
      message
    );
    response.send(encodedImage);
  }
);

app.post(
  "/api/decode",
  (request: express.Request, response: express.Response) => {
    const imageData = request.body.imageData;
    const algorithm = request.body.algorithm;

    const decodedMessage = new Steganography(algorithm, imageData).decode();
    response.send(decodedMessage);
  }
);

app.post(
  "/api/canEncode",
  (request: express.Request, response: express.Response) => {
    const message = request.body.message;
    const { height, width } = request.body.imageData;

    const binaryMessage = new Steganography("LSB-PNG", {
      base64Image: "",
      height: 0,
      width: 0
    }).convertMessageToBinary(message);
    const messageLength = binaryMessage.join("").length;
    const encodableBits = (height * width) / 4;

    let canEncode = true;
    if (messageLength > encodableBits) {
      canEncode = false;
    }

    response.send(canEncode);
  }
);

export default https.onRequest(app);
