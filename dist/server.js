'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _routes = require('./api/routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _swagger = require('./swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/api/v1/docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));

app.use('/api/v1', _routes2.default);

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '/public/index.html'));
});

app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('listening on ' + port);
});

exports.default = app;
//# sourceMappingURL=server.js.map