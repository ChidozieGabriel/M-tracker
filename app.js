import express from 'express';

import bodyParser from 'body-parser';

import Routes from './api/routes/Routes';

// import userModel from './api/models/userModel';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Request Route
app.use('/api/v1', Routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
