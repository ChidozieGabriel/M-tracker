import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import webpack from 'webpack';
import webPackDevMiddleware from 'webpack-dev-middleware';
import routes from './routes/v1/index';
import swaggerDoc from '../swagger.json';
import config from '../webpack.config';

const app = express();
const port = process.env.PORT || 5000;
const corOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// const compiler = webpack(config);

dotenv.config();
app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   webPackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//   }),
// );
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1', routes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.use(express.static(path.resolve(__dirname, '../React/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../React/dist/index.html'));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

export default app;
