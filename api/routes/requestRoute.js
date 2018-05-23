import express from 'express';

import requestController from '../controllers/requestsController';

const router = express.Router();

router.get('/users/requests', requestController.get_all_requests);

router.get('/users/requests/:requestId', requestController.get_a_request);

router.post('/users/requests/', requestController.create_a_request);

router.put('/users/requests/:requestId', requestController.modify_a_request);

router.delete('/users/requests/:requestId', requestController.delete_a_request);

export default router;

