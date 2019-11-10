/**
 * This error is thrown when the base64 image string is invalid.
 * It is thrown when the image cannot be loaded into the canvas.
 *
 * @param name: The "error code".
 * @param message: The error message.
 * @param base64Image: The image data, we were trying to encode/decode.
 *
 */
export default class InvalidImageError extends Error {
  public name: 'InvalidImage';
  public message: string;
  public base64Image: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, InvalidImageError);

    this.name = 'InvalidImage';
    this.message = message;
    this.base64Image = base64Image;
  }
}
