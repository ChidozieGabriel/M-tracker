import express from 'express';
import isAdmin from '../../middleware/isAdmin';
import {
  getAllApprovedRequests, getAllDisapprovedRequests,
  getAllPendingRequests, getAllResolvedRequests,
} from '../../controllers/filterController';

import {
  approveRequest,
  disapproveRequest, getAllRequests,
  resolveRequest,
} from '../../controllers/adminController';
import userAuth from '../../middleware/userAuth';
import verifyToken from '../../middleware/verifyToken';

const admin = express.Router();

admin.get('/requests', verifyToken, userAuth, isAdmin, getAllRequests);

admin.get('/requests/pending', verifyToken, userAuth, isAdmin, getAllPendingRequests);

admin.get('/requests/approved', verifyToken, userAuth, isAdmin, getAllApprovedRequests);

admin.get('/requests/disapproved', verifyToken, userAuth, isAdmin, getAllDisapprovedRequests);

admin.get('/requests/resolved', verifyToken, userAuth, isAdmin, getAllResolvedRequests);

admin.put('/requests/:requestId/approve', verifyToken, userAuth, isAdmin, approveRequest);

admin.put('/requests/:requestId/disapprove', verifyToken, userAuth, isAdmin, disapproveRequest);

admin.put('/requests/:requestId/resolve', verifyToken, userAuth, isAdmin, resolveRequest);

export default admin;
