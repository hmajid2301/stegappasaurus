import { https } from "firebase-functions";

import { Steganography } from "./core";
import {
  ImageNotEncodedError,
  ImageTooSmall,
  InvalidImageError,
  MessageTooLongError
} from "./core/exceptions";
import {
  IAPIError,
  IDecode,
  IDecodingSuccess,
  IEncode,
  IEncodingSuccess
} from "./models";

export const encode = https.onRequest((request, response) => {
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

    if (
      error instanceof MessageTooLongError ||
      error instanceof InvalidImageError ||
      error instanceof ImageTooSmall
    ) {
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
});

export const decode = https.onRequest((request, response) => {
  const body: IDecode = request.body;
  let decoding: IAPIError | IDecodingSuccess;
  let status = 200;

  try {
    const decodedMessage = new Steganography(body.imageData).decode();
    decoding = {
      decoded: decodedMessage
    };
  } catch (error) {
    let code = error.message;
    let errorMessage;
    console.error(error, request);

    if (
      error instanceof ImageNotEncodedError ||
      error instanceof InvalidImageError ||
      error instanceof ImageTooSmall
    ) {
      status = 400;
    } else {
      status = 500;
      code = "ServerError";
      errorMessage = "Server error, could not encode image";
    }

    decoding = {
      code,
      message: errorMessage
    } as IAPIError;
  }
  response.status(status).json(decoding);
});
