export abstract class HttpException extends Error {
  private _status: number;
  private _type: string;

  public constructor(status: number, type: string, message: string) {
    super(message);
    this._status = status;
    this._type = type;
  }

  public getResponse() {
    return {
      type: this._type,
      message: this.message,
    };
  }

  public get status() {
    return this._status;
  }

  public get type() {
    return this._type;
  }
}
