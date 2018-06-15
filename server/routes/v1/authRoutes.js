import express from 'express';

import { login, signUp } from '../../controllers/userController';

const auth = express.Router();

auth.post('/auth/signup', signUp);

auth.post('/auth/login', login);

export default auth;
