import express from 'express';

import {
  getAllUserRequests,
  getSingleRequest,
  createRequest,
  modifyRequest,
  deleteRequest,
} from '../controllers/requestsController';
import {
  getAllRequests,
  approveRequest,
  disapproveRequest,
  resolveRequest,
} from '../controllers/adminController';

import { login, signUp } from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import userAuth from '../middleware/userAuth';
import isAdmin from '../middleware/isAdmin';

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


// ADMIN ROUTES
router.get('/requests', verifyToken, userAuth, isAdmin, getAllRequests);

router.put('/requests/:requestId/approve', verifyToken, userAuth, isAdmin, approveRequest);

router.put('/requests/:requestId/disapprove', verifyToken, userAuth, isAdmin, disapproveRequest);

router.put('/requests/:requestId/resolve', verifyToken, userAuth, isAdmin, resolveRequest);

export default router;
