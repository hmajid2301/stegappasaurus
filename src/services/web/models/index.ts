export interface IHealthSuccess {
  message: string;
}

export interface IAPIError {
  code: "MessageTooLong" | "InvalidImage" | "ImageNotEncoded" | "ServerError";
  message: string;
}

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

export interface IDecode {
  imageData: {
  width: number;
  height: number;
  base64Image: string;
};
}

export interface IDecodingSuccess {
  decoded: string;
}


