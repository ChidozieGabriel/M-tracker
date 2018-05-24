import express from 'express';

import { getAllUserRequests, getSingleRequest, createRequest, modifyRequest, deleteRequest } from '../controllers/requestsController';

import { login, signUp } from '../controllers/userController';

import userAuth from '../middleware/userAuth';

const router = express.Router();

router.get('/users/requests', getAllUserRequests);
//
router.get('/users/requests/:requestId', getSingleRequest);
//
router.post('/users/requests/', createRequest);
//
router.put('/users/requests/:requestId', modifyRequest);

router.delete('/users/requests/:requestId', deleteRequest);


// USER ROUTES
router.post('/auth/signup', signUp);

router.post('/auth/login', login);


//ADMIN ROUTES

router.get('/requests', getAllRequests);

router.put('/requests/:requestId/approve', approveRequest);

router.put('/requests/:requestId/disapprove', disapproveRequest);

router.put('/requests/:requestId/resolve', resolveRequest);

router.delete('/requests/:requestId', deleteRequest);

export default router;

