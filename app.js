import express from 'express';

import bodyParser from 'body-parser';

import path from 'path';

import Routes from './api/routes/routes';


// import userModel from './api/models/userModel';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


// Request Route
app.use('/api/v1', Routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
