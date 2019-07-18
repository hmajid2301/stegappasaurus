export interface IAPIError {
  code:
    | "MessageTooLong"
    | "InvalidImage"
    | "ImageNotEncoded"
    | "ServerError"
    | "ImageTooSmall";
  message: string;
}

export interface IEncode {
  algorithm?: "LSB";
  message: string;
  metadata?: {};
  imageData: string;
}

export interface IEncodingSuccess {
  encoded: string;
}

export interface IDecode {
  imageData: string;
}

export interface IDecodingSuccess {
  decoded: string;
}
