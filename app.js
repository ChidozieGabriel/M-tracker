import express from 'express';

import bodyParser from 'body-parser';

import requestRoute from './api/routes/requestRoute';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1', requestRoute);

export default app;
