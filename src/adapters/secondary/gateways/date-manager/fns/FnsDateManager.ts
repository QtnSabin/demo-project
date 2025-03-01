import { DateManager } from '@hexagon/gateways/DateManager';
import { format } from 'date-fns';

export class FnsDateManager implements DateManager {
  public formatAsDateTime(date: Date) {
    return format(date, 'yyyy/MM/dd-HH:mm:ss');
  }
}
