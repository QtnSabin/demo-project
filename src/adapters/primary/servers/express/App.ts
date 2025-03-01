import { dependencies } from '@dependencies';
import express, { Application } from 'express';

export class App {
  private _app!: Application;

  public constructor(
    private _controllers: Array<any>,
  ) {}

  public initServer() {
    this._app = express();
    this.initMiddlewares();
    this.initControllers();
    this.listen();
  }

  private initMiddlewares() {
    this._app.use(express.json());
  }

  private initControllers() {
    this._app.post('/test', (req, res) => {
      res.send('Hello');
    });
  }

  private listen() {
    this._app.listen(dependencies.config.port);
    console.info(`Server is running on PORT ${dependencies.config.port}`);
  }
}
