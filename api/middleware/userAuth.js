import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWK_KEY, (err, decoded) => {
    if (err) {
      res.status(401)
        .json({
          message: 'Authentication failed',
        });
    }
    req.userToken = decoded;
    console.log(decoded);
  });
  next();
};
