import { Express } from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import errors from './routes/errors';

const app = new Express();

app.use(logger('dev'));
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(errors);

export default app;
