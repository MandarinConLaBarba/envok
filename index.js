'use strict'
const Joi = require('joi'),
    _ = require('underscore'),
    camelize = require('camelize');

const _check = (schema) => {
  const env = process.env,
    envKeys = Object.keys(schema),
    envCfg = _.pick(env, envKeys);


  let validatedCfg = {};

  envKeys.forEach((k) => {
    const singleVarSchema = Joi.object({
      [k]: schema[k]
    });
    const singleVarCfg = {
      [k]: envCfg[k]
    };
    let result = singleVarSchema.validate(singleVarCfg);

    if (result.error) {
      throw new Error("Environment var validation exception: " + result.error);
    }

    validatedCfg = { ...validatedCfg, ...result.value }

  })

  let formattedCfg = {};

  envKeys.forEach((k, v) => {
    formattedCfg[camelize(k.toLowerCase())] = validatedCfg[k];
  });

  return formattedCfg

}

module.exports = _check;
