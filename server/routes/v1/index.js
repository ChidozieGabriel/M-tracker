import express from 'express';

import admin from './adminRoutes';

import user from './userRoutes';

import auth from './authRoutes';

const router = express.Router();

router.use(admin);

router.use(user);

router.use(auth);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

export default router;
