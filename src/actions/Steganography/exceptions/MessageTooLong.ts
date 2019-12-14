export default class MessageTooLongError extends Error {
  public name: 'MessageTooLong';
  public message: string;
  public messageLength: number;
  public imageLength: number;

  constructor(message: string, messageLength: number, imageLength: number) {
    super(message);
    this.name = 'MessageTooLong';
    this.message = message;
    this.messageLength = messageLength;
    this.imageLength = imageLength;
    Error.captureStackTrace(this, this.constructor);
  }
}
