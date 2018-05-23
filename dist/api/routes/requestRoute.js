'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestsController = require('../controllers/requestsController');

var _requestsController2 = _interopRequireDefault(_requestsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/users/requests', _requestsController2.default.get_all_requests);

router.get('/users/requests/:requestId', _requestsController2.default.get_a_request);

router.post('/users/requests/', _requestsController2.default.create_a_request);

router.put('/users/requests/:requestId', _requestsController2.default.modify_a_request);

router.delete('/users/requests/:requestId', _requestsController2.default.delete_a_request);

exports.default = router;
//# sourceMappingURL=requestRoute.js.map