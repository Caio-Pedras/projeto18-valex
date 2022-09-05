import joi from "joi";

const onlinePaymentSchema = joi.object({
  number: joi.string().required(),
  cardHolderName: joi.string().required(),
  expirationDate: joi.string().required(),
  cvc: joi.string().required(),
  businessId: joi.number().required(),
  amount: joi.number().greater(0).required(),
});
export default onlinePaymentSchema;
