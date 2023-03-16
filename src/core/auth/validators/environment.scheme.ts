import * as Joi from 'joi';

export const EnvironmentSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development').required(),
  DB_userName: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
}).options({
  allowUnknown: true,
  abortEarly: false,
});
