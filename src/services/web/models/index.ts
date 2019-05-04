export interface IEncode {
  algorithm?: "LSB";
  message: string;
  imageData: {
    width: number;
    height: number;
    base64Image: string;
  };
}

export interface IEncodingSuccess {
  encoded: string;
}

export interface IEncodingError {
  code: "MessageTooLong" | "InvalidImage" | "ServerError";
  message: string;
}

export interface IDecode {
  algorithm?: "LSB";
  imageData: {
    width: number;
    height: number;
    base64Image: string;
  };
}

export interface IDecodingSuccess {
  decoded: string;
}

export interface IDecodingError {
  code: "InvalidImage" | "ImageNotEncoded" | "ServerError";
  message: string;
}
