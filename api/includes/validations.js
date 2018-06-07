import Joi from 'joi';


exports.requestValidation = Joi.object()
  .keys({
    name: Joi.string()
      .trim()
      .required(),
    department: Joi.string()
      .trim()
      .required(),
    request: Joi.string()
      .trim()
      .min(10)
      .max(200)
      .required(),


  });
exports.signUpValidation = Joi.object()
  .keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .trim()
      .alphanum()
      .min(4)
      .max(8)
      .required(),
  });

exports.loginValidation = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .trim()
      .alphanum()
      .min(4)
      .max(8)
      .required(),
  });
