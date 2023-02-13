import joi from 'joi'

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(), 
    stockTotal: joi.string().required(),
    pricePerDay: joi.string().required()
});

  // {
    //     name: 'Banco Imobiliário',
    //     image: 'http://',
    //     stockTotal: 3,
    //     pricePerDay: 1500,