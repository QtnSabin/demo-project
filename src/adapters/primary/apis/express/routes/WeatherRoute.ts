import { weatherValidation } from '@primary/validations/zod/weatherValidation';
import { WeatherController } from '../controllers/weather/WeatherController';
import { CheckPayloadMiddleware } from '../middlewares/check-payload/zod/CheckPayloadMiddleware';
import { Route } from './Route';

export class WeatherRoute extends Route<typeof WeatherController> {
  public constructor() {
    super(WeatherController);
  }

  protected setRoutes(): void {
    this.router.get(
      this.controller.basePath,
      new CheckPayloadMiddleware({ query: weatherValidation.get }).handler(),
      this.controller.get,
    );
  }
}
