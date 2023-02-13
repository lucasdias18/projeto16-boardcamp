import joi from 'joi'

export const userSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().required(),
  cpf: joi.string().alphanum().required().min(11).max(11),
  birthday: joi.string().required()
});