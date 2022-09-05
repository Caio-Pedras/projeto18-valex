import joi from "joi";
var activateSchema = joi.object({
    cvc: joi.string().required(),
    password: joi.string().required()
});
export default activateSchema;
