import * as express from "express";
import { https } from "firebase-functions";

import validateToken from "./middleware/Token";
import Steganography from "./steganography";

const app = express();
app.use(validateToken);

app.post("/encode", (request: express.Request, response: express.Response) => {
  const imageData = request.body.imageData;
  const algorithm = request.body.algorithm;
  const message = request.body.message;

  const encodedImage = new Steganography(algorithm, imageData).encode(message);
  response.send(encodedImage);
});

app.post("/decode", (request: express.Request, response: express.Response) => {
  const imageData = request.body.imageData;
  const algorithm = request.body.algorithm;

  const decodedMessage = new Steganography(algorithm, imageData).decode();
  response.send(decodedMessage);
});

export default https.onRequest(app);
