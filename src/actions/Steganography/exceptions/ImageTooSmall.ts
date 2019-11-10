/**
 * This error is thrown when the image is too small, which means less than
 * 64 by 64 pixels.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to encode/decode.
 *
 */
export default class ImageTooSmall extends Error {
  public name: 'ImageTooSmall';
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, ImageTooSmall);

    this.name = 'ImageTooSmall';
    this.message = message;
    this.base64Image = base64Image;
  }
}
