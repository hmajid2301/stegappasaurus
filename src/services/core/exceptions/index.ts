/* tslint:disable: max-classes-per-file */

/**
 * This error is thrown when the message is too long to encode into an image.
 * Can only be thrown when trying to encode data into an image and we run out
 * of pixels to encode.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param messageToEncode: The message we were trying to encode into the image.
 *
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
 * This error is thrown when the base64 image string is invalid.
 * It is thrown when the image cannot be loaded into the canvas.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to encode/decode.
 *
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
 * This error is thrown when the we cannot decode the message from an image.
 * This is thrown during the decoding when we run out of pixels to decode.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to decode.
 *
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

/**
 * This error is thrown when the image is too small, which means less than
 * 64 by 64 pixels.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to encode/decode.
 *
 */
export class ImageTooSmall extends Error {
  public name: "ImageTooSmall";
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, ImageNotEncodedError);

    this.name = "ImageTooSmall";
    this.message = message;
    this.base64Image = base64Image;
  }
}
