import { jsonValidation } from '@primary/validations/zod/jsonValidation';
import { CheckPayloadMiddleware } from '../middlewares/check-payload/zod/CheckPayloadMiddleware';
import { Route } from './Route';
import { JsonController } from '../controllers/json/JsonController';

export class JsonRoute extends Route<typeof JsonController> {
  public constructor() {
    super(JsonController);
  }

  protected setRoutes(): void {
    this.router.post(
      `${this.controller.basePath}/sum`,
      new CheckPayloadMiddleware({ body: jsonValidation.sum }).handler(),
      this.controller.sum,
    );
  }
}
