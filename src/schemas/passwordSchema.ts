import joi from "joi";

const passwordSchema = joi.object({
  password: joi.string().required(),
});
export default passwordSchema;
