'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestsController = require('../controllers/requestsController');

var _userController = require('../controllers/userController');

var _userAuth = require('../middleware/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/users/requests', _requestsController.getAllRequests);
//
router.get('/users/requests/:requestId', _requestsController.getSingle);
//
router.post('/users/requests/', _requestsController.createRequest);
//
router.put('/users/requests/:requestId', _requestsController.modifyRequest);

router.delete('/users/requests/:requestId', _requestsController.deleteRequest);

// USER ROUTES
router.post('/auth/signup', _userController.signUp);

router.post('/auth/login', _userController.login);

exports.default = router;
//# sourceMappingURL=routes.js.map
