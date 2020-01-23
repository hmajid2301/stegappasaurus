export default class ImageNotEncodedError extends Error {
  public name: 'ImageNotEncoded';
  public message: string;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, ImageNotEncodedError);

    this.name = 'ImageNotEncoded';
    this.message = message;
  }
}
