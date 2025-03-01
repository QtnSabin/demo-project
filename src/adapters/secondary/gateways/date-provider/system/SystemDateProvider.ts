import { DateProvider } from '@hexagon/gateways/DateProvider';

export class SystemDateProvider implements DateProvider {
  public now(): Date {
    return new Date();
  }
}
