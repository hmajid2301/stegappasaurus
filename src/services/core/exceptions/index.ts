/* tslint:disable: max-classes-per-file */
/**
 * This file contains all the custom user made exceptions for this project.
 */

/**
 * This Error is thrown when the message to be encoded, will take more bits
 * than we have available in the image itself. Will only be thrown when trying
 * to encode the image.
 */
export class MessageTooLongError extends Error {
  public name: "MessageTooLong";
  public message: string;
  public messageToEncode: string;

  constructor(message: string, messageToEncode: string) {
    super(message);

    Error.captureStackTrace(this, MessageTooLongError);
    this.name = "MessageTooLong";
    this.message = message;
    this.messageToEncode = messageToEncode;
  }
}

/**
 * This Error is thrown when the base 64 image is invalid and cannot be loaded onto
 * the canvas.
 */
export class InvalidImageError extends Error {
  public name: "InvalidImage";
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, InvalidImageError);

    this.name = "InvalidImage";
    this.message = message;
    this.base64Image = base64Image;
  }
}

/**
 * The Error is thrown when we are trying to decode an image, but we run out of bits
 * which would not happen if it's encoded correctly.
 */
export class ImageNotEncodedError extends Error {
  public name: "ImageNotEncoded";
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, ImageNotEncodedError);

    this.name = "ImageNotEncoded";
    this.message = message;
    this.base64Image = base64Image;
  }
}
