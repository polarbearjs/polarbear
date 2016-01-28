import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import errors from './routes/error-handling';
import clientRoutes from './routes/client';

const app = express();

app.use(logger('dev'));
app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(clientRoutes);
app.use(errors);

export default app;
