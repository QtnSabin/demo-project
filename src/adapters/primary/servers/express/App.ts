import { dependencies } from '@dependencies';
import express, { Application, Router } from 'express';
import { Server } from 'http';
import routes from './routes';
import { ExceptionHandlerMiddleware } from './middlewares/exception-handler/ExceptionHandlerMiddleware';

export class App {
  private _app!: Application;
  private _server!: Server;

  public constructor() {}

  public initServer() {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes();

    // Le middleware d'exception doit être défini après toutes les routes.
    this._app.use(new ExceptionHandlerMiddleware().handle);
    this.listen();
  }

  private initMiddlewares() {
    this._app.use(express.json());
  }

  private initRoutes() {
    const router = Router();
    router.use('/', routes.map((route) => route.router));
    this._app.use(router);
  }

  private listen() {
    this._server = this._app.listen(dependencies.config.port);
    dependencies.logProvider.info(`Server is running on PORT ${dependencies.config.port}`);
  }

  public get app() {
    return this._app;
  }

  public get server() {
    return this._server;
  }
}
