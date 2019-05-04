import * as express from "express";

import { Steganography } from "../../core";
import { InvalidImageError, MessageTooLongError } from "../../core/exceptions";
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
    algorithm = "LSB";
  }

  let encoding: IEncodingError | IEncodingSuccess;
  let status = 200;
  try {
    const encodedImage = new Steganography(imageData).encode(
      message,
      algorithm
    );

    encoding = {
      encoded: encodedImage
    };
  } catch (error) {
    let code = error.name;
    let errorMessage = error.message;
    console.error(error, request);

    if (error instanceof MessageTooLongError) {
      status = 400;
    } else if (error instanceof InvalidImageError) {
      status = 400;
    } else {
      status = 500;
      code = "ServerError";
      errorMessage = "Server error, could not encode image";
    }

    encoding = {
      code,
      message: errorMessage
    } as IEncodingError;
  }
  response.status(status).json(encoding);
};
