import joi from "joi";

const activateSchema = joi.object({
  cvc: joi.string().required(),
  password: joi.string().required(),
});
export default activateSchema;
