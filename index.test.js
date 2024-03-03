const checkEnvVars = require('./index');
const Joi = require('joi');

describe('checkEnvVars', () => {
    beforeEach(() => {
        process.env = {
            ENV_VAR_1: 'value1',
            ENV_VAR_2: 'value2',
            ENV_VAR_3: 'value3',
        };
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('should validate and format environment variables correctly', () => {
        const schema = {
            ENV_VAR_1: Joi.string().required(),
            ENV_VAR_2: Joi.string().required(),
        };

        const result = checkEnvVars(schema);

        expect(result).toEqual({
            envVar1: 'value1',
            envVar2: 'value2',
        });
    });

    it('should throw an error when required environment variables are missing', () => {
        const schema = {
            ENV_VAR_1: Joi.string().required(),
            ENV_VAR_4: Joi.string().required(),
        };

        expect(() => checkEnvVars(schema)).toThrowError(
            'Environment var validation exception'
        );
    });

    it('should ignore non-required environment variables', () => {
        const schema = {
            ENV_VAR_1: Joi.string().required(),
        };

        const result = checkEnvVars(schema);

        expect(result).toEqual({
            envVar1: 'value1',
        });
    });
});
