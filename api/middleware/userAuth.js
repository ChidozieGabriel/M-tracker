import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401)
        .json({
          error: 'Authentication failed',
        });
    }
    req.userInfo = decoded;
  });
  next();
};
