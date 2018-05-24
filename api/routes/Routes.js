import express from 'express';

import { getAllRequests, getSingle, createRequest, modifyRequest, deleteRequest } from '../controllers/requestsController';

import { login, signUp } from '../controllers/userController';

import userAuth from '../middleware/userAuth';

const router = express.Router();

router.get('/users/requests', getAllRequests);
//
router.get('/users/requests/:requestId', getSingle);
//
router.post('/users/requests/', createRequest);
//
router.put('/users/requests/:requestId', modifyRequest);

router.delete('/users/requests/:requestId', deleteRequest);


// USER ROUTES
router.post('/auth/signup', signUp);

router.post('/auth/login', login);

export default router;

