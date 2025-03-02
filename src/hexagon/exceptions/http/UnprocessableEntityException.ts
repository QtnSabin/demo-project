import { HttpException } from './HttpException';

export class UnprocessableEntityException<T> extends HttpException {
  public constructor(private readonly _errors: T) {
    super(422, 'invalid_data', 'Invalid data');
  }

  public getResponse() {
    return {
      type: this.type,
      message: this.message,
      details: this._errors,
    };
  }
}
