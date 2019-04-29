import * as express from "express";

import { Steganography } from "../../core";
import { IDecode, IDecodingError, IDecodingSuccess } from "../models";

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
    };
  } catch (error) {
    decoding = {
      code: error.message,
      message: "An error has occurred."
    };
    status = error.status;
  }
  response.status(status).json(decoding);
};
