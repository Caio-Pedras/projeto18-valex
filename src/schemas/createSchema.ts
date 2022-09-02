import joi from "joi";

const createSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});
export default createSchema;
