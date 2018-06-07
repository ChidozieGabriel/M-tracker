'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestsController = require('../controllers/requestsController');

var _adminController = require('../controllers/adminController');

var _userController = require('../controllers/userController');

var _verifyToken = require('../middleware/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _userAuth = require('../middleware/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

var _isAdmin = require('../middleware/isAdmin');

var _isAdmin2 = _interopRequireDefault(_isAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/users/requests', _verifyToken2.default, _userAuth2.default, _requestsController.getAllUserRequests);
//
router.get('/users/requests/:requestId', _verifyToken2.default, _userAuth2.default, _requestsController.getSingleRequest);
//
router.post('/users/requests/', _verifyToken2.default, _userAuth2.default, _requestsController.createRequest);
//
router.put('/users/requests/:requestId', _verifyToken2.default, _userAuth2.default, _requestsController.modifyRequest);

router.delete('/users/requests/:requestId/delete', _verifyToken2.default, _userAuth2.default, _requestsController.deleteRequest);

// USER ROUTES
router.post('/auth/signup', _userController.signUp);

router.post('/auth/login', _userController.login);

// ADMIN ROUTES
router.get('/requests', _verifyToken2.default, _userAuth2.default, _isAdmin2.default, _adminController.getAllRequests);

router.put('/requests/:requestId/approve', _verifyToken2.default, _userAuth2.default, _isAdmin2.default, _adminController.approveRequest);

router.put('/requests/:requestId/disapprove', _verifyToken2.default, _userAuth2.default, _isAdmin2.default, _adminController.disapproveRequest);

router.put('/requests/:requestId/resolve', _verifyToken2.default, _userAuth2.default, _isAdmin2.default, _adminController.resolveRequest);

exports.default = router;
//# sourceMappingURL=routes.js.map