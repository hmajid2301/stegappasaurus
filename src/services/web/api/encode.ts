import { Operation } from "express-openapi";

import Steganography from "../../core";
import { IEncode, IEncodingError, IEncodingSuccess, } from "../models";


/**
 * Encodes data into an image.
 *
 * @param request: Request from the user.
 *
 * @param response: Response to the user.
 *
 */
export const post: Operation = [
  (request, response, _) => {
    const body: IEncode = request.body;
    const { imageData, message } = body;

    let algorithm = body.algorithm;
    if (algorithm === undefined) {
      algorithm = "LSB-PNG";
    }

    let encoding: IEncodingError | IEncodingSuccess;
    let status = 200;
    try {
      const encodedImage = new Steganography(algorithm, imageData).encode(
        message
      );
      encoding = {
        encoded: encodedImage
      }
    } catch (error) {
      encoding = {
        code: error.message,
        message: "An error has occurred."
      }
      status = error.status;
    }
    response.status(status).json(encoding);
  }
];

post.apiDoc = `
summary: Encodes an image using steganography.
operationId: encode
tags:
  - steganography
requestBody:
  description: Encode an image with a message.
  required: true
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/Encode'
responses:
  200:
    description: Successfully encoded image.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/EncodingSuccess"
  500:
    description: Error occurred while trying to encode image.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/EncodingError"
`
