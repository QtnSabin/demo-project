import { DateProvider } from '@hexagon/gateways/DateProvider';

export class DateProviderStub implements DateProvider {
  private _dateNow: Date | null = null;

  public now(): Date {
    return this._dateNow!;
  }

  public set dateNow(value: Date) {
    this._dateNow = value;
  }
}
