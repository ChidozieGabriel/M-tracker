import express from 'express';
import isAdmin from '../../middleware/isAdmin';
import { requestsOrderBy } from '../../controllers/filterController';

import {
  getAllRequests,
  getOneRequest,
  adminRequestActions,
} from '../../controllers/adminController';

import userAuth from '../../middleware/userAuth';
import verifyToken from '../../middleware/verifyToken';

const admin = express.Router();

admin.get('/requests', verifyToken, userAuth, isAdmin, getAllRequests);

admin.get(
  '/requests/admin/:requestId/',
  verifyToken,
  userAuth,
  isAdmin,
  getOneRequest,
);

admin.get('/requests/:action', verifyToken, userAuth, isAdmin, requestsOrderBy);

admin.put(
  '/requests/:requestId/:action',
  verifyToken,
  userAuth,
  isAdmin,
  adminRequestActions,
);

export default admin;
