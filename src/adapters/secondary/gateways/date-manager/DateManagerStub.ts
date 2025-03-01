import { DateManager } from '@hexagon/gateways/DateManager';

export class DateManagerStub implements DateManager {
  public formatAsDateTime(date: Date) {
    return `formatAsDateTime-${date.toISOString()}`;
  }
}
