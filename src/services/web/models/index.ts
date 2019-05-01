export interface IEncode {
  algorithm?: "LSB-PNG" | "LSB-DCT" | "F5";
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
  algorithm?: "LSB-PNG" | "LSB-DCT" | "F5";
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
