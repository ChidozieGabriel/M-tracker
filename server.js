import express from 'express';

import bodyParser from 'body-parser';

import path from 'path';

import swaggerUI from 'swagger-ui-express';

import Routes from './api/routes/routes';

import swaggerDoc from './swagger.json';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/api/v1', Routes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
