import express from 'express';

import {
  getAllUserRequests,
  getSingleRequest,
  createRequest,
  modifyRequest,
  deleteRequest,
} from '../controllers/requestsController';

import { login, signUp } from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import userAuth from '../middleware/userAuth';

// import userAuth from '../middleware/userAuth';

const router = express.Router();

router.get('/users/requests', verifyToken, userAuth, getAllUserRequests);
//
router.get('/users/requests/:requestId', verifyToken, userAuth, getSingleRequest);
//
router.post('/users/requests/', verifyToken, userAuth, createRequest);
//
router.put('/users/requests/:requestId', verifyToken, userAuth, modifyRequest);

router.delete('/users/requests/:requestId/delete', verifyToken, userAuth, deleteRequest);


// USER ROUTES
router.post('/auth/signup', signUp);

router.post('/auth/login', login);


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

export default router;

