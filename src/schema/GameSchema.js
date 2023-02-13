import joi from 'joi'

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(), 
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().required()
});

  // {
    //     name: 'Banco Imobiliário',
    //     image: 'http://',
    //     stockTotal: 3,
    //     pricePerDay: 1500,