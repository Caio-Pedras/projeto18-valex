import joi from "joi";
var passwordSchema = joi.object({
    password: joi.string().required()
});
export default passwordSchema;
