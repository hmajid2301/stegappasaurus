export default class InvalidImageError extends Error {
  public name: 'InvalidImage';
  public message: string;
  public imageURI: string;

  constructor(message: string, base64Image: string) {
    super(message);
    Error.captureStackTrace(this, InvalidImageError);

    this.name = 'InvalidImage';
    this.message = message;
    this.imageURI = base64Image;
  }
}
