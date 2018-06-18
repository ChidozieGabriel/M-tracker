import express from 'express';

import bodyParser from 'body-parser';

import path from 'path';

import dotenv from 'dotenv';

import swaggerUI from 'swagger-ui-express';

import routes from './routes/v1/index';

import swaggerDoc from '../swagger.json';

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
