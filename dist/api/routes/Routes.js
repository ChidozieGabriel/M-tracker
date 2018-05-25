'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestsController = require('../controllers/requestsController');

var _userController = require('../controllers/userController');

var _verifyToken = require('../middleware/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _userAuth = require('../middleware/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import userAuth from '../middleware/userAuth';

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

//ADMIN ROUTES
//
// router.get('/requests', getAllRequests);
//
// router.put('/requests/:requestId/approve', approveRequest);
//
// router.put('/requests/:requestId/disapprove', disapproveRequest);
//
// router.put('/requests/:requestId/resolve', resolveRequest);
//
// router.delete('/requests/:requestId', deleteRequest);

exports.default = router;
//# sourceMappingURL=Routes.js.map