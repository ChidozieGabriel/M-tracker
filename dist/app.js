'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Routes = require('./api/routes/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import userModel from './api/models/userModel';

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Request Route
app.use('/api/v1', _Routes2.default);

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('listening on ' + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map