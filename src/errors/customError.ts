import getErrorMessage from "./getErrorMessage";

class CustomError {
  public code: number;
  public message: string;

  constructor(code: number, message?: string) {
    this.code = code;
    this.message = message || getErrorMessage(code) || "Bad Request";
  }
}

export default CustomError;
