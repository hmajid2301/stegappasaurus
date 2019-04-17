import * as express from "express";
import { https } from "firebase-functions";

import validateToken from "./middleware/Token";
import Steganography from "./steganography";

/**
 * This module has all the APIs that exist on Firebase. This module is the main
 * module called by the user (from the app). We currently have the following
 * endpoints
 *
 * - /api/encode: This API encodes the data into an image.
 * - /api/decode: This API decodes data from the image.
 *
 */

const app = express();
app.use(validateToken);

/**
 * Encodes data into an image.
 *
 * @param request: Request from the user.
 * 
 * @param response: Response to the user.
 *
 */
app.post(
  "/api/encode",
  (request: express.Request, response: express.Response) => {
    const imageData = request.body.imageData;
    const algorithm = request.body.algorithm;
    const message = request.body.message;

    try {
      const encodedImage = new Steganography(algorithm, imageData).encode(
        message
      );
      response.status(200).send(encodedImage);
    }
    catch (error) {
      response.status(500).json({ error_code: error.toString() });
    }
  }
);

/**
 * Decodes data from the image.
 *
 * @param request: Request from the user.
 * 
 * @param response: Response to the user.
 *
 */
app.post(
  "/api/decode",
  (request: express.Request, response: express.Response) => {
    const imageData = request.body.imageData;
    const algorithm = request.body.algorithm;

    try {
      const decodedMessage = new Steganography(algorithm, imageData).decode();
      response.send(decodedMessage);
    }
    catch (error) {
      response.status(500).json({ error_code: error.toString() });
    }
  }
);

export default https.onRequest(app);
