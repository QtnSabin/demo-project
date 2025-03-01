import { LogProvider } from '@hexagon/gateways/LogProvider';

export class LogProviderStub implements LogProvider {
  private _infoParams: Array<Record<string, any>> = [];
  private _errorParams: Array<Record<string, any>> = [];

  public info(message: string): void {
    this._infoParams.push({ message });
  }

  public error(message: string): void {
    this._errorParams.push({ message });
  }

  public get infoParams() {
    return this._infoParams;
  }

  public get errorParams() {
    return this._errorParams;
  }
}
