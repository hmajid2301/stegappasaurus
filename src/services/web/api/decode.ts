import { Operation } from "express-openapi";

import Steganography from "../../core";
import { IDecode, IDecodingError, IDecodingSuccess, } from "../models";

/**
 * Decode data from an image.
 *
 * @param request: Request from the user.
 *
 * @param response: Response to the user.
 *
 */
export const post: Operation = [
  (request, response, _) => {
    const body: IDecode = request.body;
    const { imageData } = body;

    let algorithm = body.algorithm;
    if (algorithm === undefined) {
      algorithm = "LSB-PNG";
    }

    let decoding: IDecodingError | IDecodingSuccess;
    let status = 200;

    try {
      const decodedMessage = new Steganography(algorithm, imageData).decode();
      decoding = {
        decoded: decodedMessage
      }
    } catch (error) {
      decoding = {
        code: error.message,
        message: "An error has occurred."
      }
      status = error.status;
    }
    response.status(status).json(decoding);
  }
];

post.apiDoc = `
summary: Decodes an image using steganography.
operationId: decode
tags:
  - steganography
requestBody:
  description: Decode an image with a message.
  required: true
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/Decode'
responses:
  200:
    description: Successfully decoded image.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/DecodingSuccess"
  500:
    description: Error occurred while trying to decode image.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/DecodingError"
`
