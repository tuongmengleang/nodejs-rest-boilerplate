const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    }),
};

const login = {
    body: Joi.object().keys( {
        email: Joi.string().email().required(),
        password: Joi.string().required().max(128),
    }),
};

const refresh = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        refreshToken: Joi.string().required(),
    })
};

module.exports = {
    register,
    login,
    refresh
};
