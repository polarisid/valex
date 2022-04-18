import Joi from "joi";

const cardSchema = Joi.object({
    type: Joi.string()
    .valid("groceries", "restaurants", "transport", "education", "health")
    .required(),
    employerId: Joi.string().required()
});

export default cardSchema;