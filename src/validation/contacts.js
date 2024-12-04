import Joi from 'joi';

export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'any.required': ('Name is required'),
    }),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        'any.required' : 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email' : 'Should be a valid email address',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20),
});

export const contactSchemaPutch = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().message({
        'string.email' : 'Should be a valid email address',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20),
});