/**
 * This error is thrown when the we cannot decode the message from an image.
 * This is thrown during the decoding when we run out of pixels to decode.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to decode.
 *
 */
export default class ImageNotEncodedError extends Error {
  public name: 'ImageNotEncoded';
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, ImageNotEncodedError);

    this.name = 'ImageNotEncoded';
    this.message = message;
    this.base64Image = base64Image;
  }
}
