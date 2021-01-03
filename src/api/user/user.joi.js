const Joi = require('joi');

const createJoi = {
    body: Joi.object({
        name: Joi.string(),
        password:Joi.string().alphanum().min(7).max(30).required(),
        email:Joi.string().email().required()
    })
};

const updateJoi = {
    body: Joi.object({
        name: Joi.string(),
        password:Joi.string().alphanum().min(7).max(30).required(),
        email:Joi.string().email().required()
    })
}

module.exports = {
    createJoi,
    updateJoi
}
