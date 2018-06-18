import express from 'express';

import {
  getAllUserRequests,
  getSingleRequest,
  createRequest,
  modifyRequest,
  deleteRequest,
} from '../../controllers/requestsController';

import verifyToken from '../../middleware/verifyToken';

import userAuth from '../../middleware/userAuth';

const loggedInUser = express.Router();

loggedInUser.get('/users/requests', verifyToken, userAuth, getAllUserRequests);

loggedInUser.get('/users/requests/:requestId', verifyToken, userAuth, getSingleRequest);

loggedInUser.post('/users/requests/', verifyToken, userAuth, createRequest);

loggedInUser.put('/users/requests/:requestId', verifyToken, userAuth, modifyRequest);

loggedInUser.delete('/users/requests/:requestId/delete', verifyToken, userAuth, deleteRequest);

export default loggedInUser;
