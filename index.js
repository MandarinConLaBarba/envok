'use strict'
var Joi = require('joi'),
  _ = require('underscore'),
  camelize = require('camelize');

const _check = (schema) => {
  const env = process.env,
    envKeys = Object.keys(schema),
    envCfg = _.pick(env, envKeys);

  let result = Joi.validate(envCfg, schema);
  if (result.error) {
    throw new Error("Environment var validation exception: " + result.error);
  }

  let validatedCfg = result.value,
  formattedCfg = {};

  envKeys.forEach((k, v) => {
    formattedCfg[camelize(k.toLowerCase())] = v;
  });

  return formattedCfg

}

module.exports = _check;
