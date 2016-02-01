import express from 'express';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import errors from './routes/error-handling';
import clientRoutes from './routes/client';

const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(clientRoutes);
app.use(errors);

export default app;
