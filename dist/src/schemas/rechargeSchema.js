import joi from "joi";
var rechargeSchema = joi.object({
    amount: joi.number().greater(0).required()
});
export default rechargeSchema;
