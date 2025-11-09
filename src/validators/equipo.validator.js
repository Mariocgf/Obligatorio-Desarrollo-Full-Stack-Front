import Joi from "joi";

export const equipoSchema = Joi.object({
    nombre: Joi.string().min(3).max(30).required().messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre debe tener como máximo 30 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
    descripcion: Joi.string().min(10).max(100).required().messages({
            'string.base': 'La descripción debe ser un texto',
            'string.empty': 'La descripción no puede estar vacía',
            'string.min': 'La descripción debe tener al menos 10 caracteres',
            'string.max': 'La descripción debe tener como máximo 100 caracteres',
            'any.required': 'La descripción es obligatoria'
        })
});