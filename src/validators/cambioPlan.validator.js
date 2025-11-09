import Joi from "joi";

export const cambioPlanSchema = Joi.object({    
    planActual: Joi.string().valid('basico', 'premium', 'pro').required().messages({
            'string.base': 'El plan actual debe ser un texto',
            'any.only': 'El plan actual debe ser uno de los siguientes: basico, premium, pro',
            'any.required': 'El plan actual es obligatorio'
        }), 
    planNuevo: Joi.string().valid('basico', 'premium', 'pro').required().messages({
            'string.base': 'El plan nuevo debe ser un texto',
            'any.only': 'El plan nuevo debe ser uno de los siguientes: basico, premium, pro',
            'any.required': 'El plan nuevo es obligatorio'
        })
});