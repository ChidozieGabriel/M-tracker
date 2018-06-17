import Joi from 'joi';

export const requestValidation = Joi.object()
  .keys({
    department: Joi.string()
      .trim()
      .required(),
    request: Joi.string()
      .trim()
      .min(10)
      .max(200)
      .required(),


  });
export const signUpValidation = Joi.object()
  .keys({
    name: Joi.string()
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
export const loginValidation = Joi.object()
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
