import { PingController } from '../controllers/ping/PingController';
import { Route } from './Route';

export class PingRoute extends Route<typeof PingController> {
  public constructor() {
    super(PingController);
  }

  protected setRoutes(): void {
    this.router.get(this.controller.basePath, this.controller.get);
  }
}
