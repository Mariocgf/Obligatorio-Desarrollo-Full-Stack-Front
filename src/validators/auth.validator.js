import Joi from "joi";

export const registroUsuario = Joi.object({
    nombre: Joi.string().min(3).max(15).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos {#limit} caracteres",
        "string.max": "El nombre debe tener como máximo {#limit} caracteres",
        "any.required": "El nombre es obligatorio"
    }),
    apellido: Joi.string().min(2).max(25).required().messages({
        "string.base": "El apellido debe ser un texto",
        "string.empty": "El apellido no puede estar vacío",
        "string.min": "El apellido debe tener al menos {#limit} caracteres",
        "string.max": "El apellido debe tener como máximo {#limit} caracteres",
        "any.required": "El apellido es obligatorio"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "El email debe ser un texto",
        "string.email": "El email no cumple el formato",
        "any.required": "El email es obligatorio"
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).required().messages({
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres",
        "string.pattern.base": "La contraseña debe tener letras y números",
        "any.required": "La contraseña es obligatorio"
    }),
    repeatPassword: Joi.valid(Joi.ref("password")).required().messages({
        "any.only": "La contraseña es difierente a la primera",
        "any.required": "Debe repetir la contraseña"
    }),
    username: Joi.string().min(6).max(15).required().messages({
        "string.base": "El nombre de usuario debe ser un texto",
        "string.empty": "El nombre de usuario no puede estar vacío",
        "string.min": "El nombre de usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de debe usuario tener como máximo {#limit} caracteres",
        "any.required": "El nombre de usuario es obligatorio"
    }),
    fechaNacimiento: Joi.date().max('now').required().messages({
        "date.max": "La fecha no puede ser igual o mayor al actual",
        "any.required": "La fecha es obligatoria"
    })
});

export const loginUsuarioSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "El email debe ser un texto",
        "string.email": "El email no cumple el formato",
        "any.required": "El email es obligatorio"
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).required().messages({
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres",
        "string.pattern.base": "La contraseña debe tener letras y números",
        "any.required": "La contraseña es obligatorio"
    })
});
