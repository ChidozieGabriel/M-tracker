'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requestRoute = require('./api/routes/requestRoute');

var _requestRoute2 = _interopRequireDefault(_requestRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded());

app.use('/api/v1', _requestRoute2.default);

exports.default = app;
//# sourceMappingURL=app.js.map