import * as express from "express";

import { Steganography } from "../../core";
import { IEncode, IEncodingError, IEncodingSuccess } from "../models";

/**
 * Encodes data into an image.
 *
 * @param request: Request from the user.
 *
 * @param response: Response to the user.
 *
 */
export default async (request: express.Request, response: express.Response) => {
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
    };
  } catch (error) {
    encoding = {
      code: error.message,
      message: "An error has occurred."
    };
    status = error.status;
  }
  response.status(status).json(encoding);
};
