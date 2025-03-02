import { Router } from 'express';

export abstract class Route<T extends new (...args: any) => any> {
  private readonly _router: Router;
  public controller: InstanceType<T>;

  public constructor(controller: T) {
    this._router = Router();
    this.controller = Reflect.construct(controller, []);
    this.setRoutes();
  }

  protected abstract setRoutes(): void;

  public get router() {
    return this._router;
  }
}
