import 'module-alias/register';
import 'source-map-support/register';
import { App } from '@primary/servers/express/App';

const app = new App();
app.initServer();
