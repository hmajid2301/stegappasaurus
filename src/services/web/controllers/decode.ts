import * as express from "express";

import { Steganography } from "~/core";
import { ImageNotEncodedError, InvalidImageError } from "~/core/exceptions";
import { IAPIError, IDecode, IDecodingSuccess } from "~/web/models";

/**
 * Decode data from an image.
 *
 * @param request: Request from the user.
 *
 * @param response: Response to the user.
 *
 */
export default (request: express.Request, response: express.Response) => {
  const body: IDecode = request.body;
  const { imageData } = body;

  let decoding: IAPIError | IDecodingSuccess;
  let status = 200;

  try {
    const decodedMessage = new Steganography(imageData).decode();
    decoding = {
      decoded: decodedMessage
    };
  } catch (error) {
    let code = error.message;
    let errorMessage;
    console.error(error, request);

    if (error instanceof ImageNotEncodedError) {
      status = 400;
    } else if (error instanceof InvalidImageError) {
      status = 400;
    } else {
      status = 500;
      code = "ServerError";
      errorMessage = "Server error, could not encode image";
    }

    decoding = {
      code,
      message: errorMessage
    } as IDecodingError;
  }
  response.status(status).json(decoding);
};
