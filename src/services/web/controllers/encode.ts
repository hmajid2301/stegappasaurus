import * as express from "express";

import { Steganography } from "../../core";
import { InvalidImageError, MessageTooLongError } from "../../core/exceptions";
import { IAPIError, IEncode, IEncodingSuccess } from "../../web/models";

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

  let algorithm = body.algorithm;
  if (algorithm === undefined) {
    algorithm = "LSB";
  }

  let encoding: IAPIError | IEncodingSuccess;
  let status = 200;
  try {
    const encodedImage = new Steganography(body.imageData).encode(
      body.message,
      algorithm,
      body.metadata
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
    } as IAPIError;
  }
  response.status(status).json(encoding);
};
