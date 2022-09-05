import joi from "joi";
var paymentSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().required(),
    businessId: joi.number().required(),
    amount: joi.number().greater(0).required()
});
export default paymentSchema;
