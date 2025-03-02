import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
  public constructor() {
    super(404, 'not_found', 'Resource not found');
  }
}
