const Joi = require("joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().required().min(5),
    status: Joi.string().required(),
  });

  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6),
  });

  return schema.validate(data);
};

module.exports = {registerValidation, loginValidation}
