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
export default class MessageTooLongError extends Error {
  public name: 'MessageTooLong';
  public message: string;
  public messageToEncode: string;

  constructor(message: string, messageToEncode: string) {
    super(message);

    Error.captureStackTrace(this, MessageTooLongError);
    this.name = 'MessageTooLong';
    this.message = message;
    this.messageToEncode = messageToEncode;
  }
}
