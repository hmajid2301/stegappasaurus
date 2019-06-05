export interface IAPIError {
  code: "MessageTooLong" | "InvalidImage" | "ImageNotEncoded" | "ServerError";
  message: string;
}

export interface IEncode {
  algorithm?: "LSB" | "DCT";
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
