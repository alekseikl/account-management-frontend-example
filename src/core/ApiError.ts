export interface BaseError {
  readonly message: string;
}

/**
 * ApiError don't have Error as its base class since typescript can't extend Error class correctly 
 * when the compile target is es5
 */
export class ApiError {
  readonly message: string;
  readonly isTransportError: boolean;

  constructor(message: string, isTransportError = false) {
    this.message = message;
    this.isTransportError = isTransportError;
  }
}
 