import { BadRequestException } from '@nestjs/common';
import Ajv from 'ajv';

const ajv = new Ajv();

export const validate = (reqBody, targetSchema) => {
  const valid = ajv.validate(targetSchema, reqBody);

  if (!valid) {
    throw new BadRequestException({
      message: `Request body validation failed with ${ajv.errorsText()}`,
    });
  }
};
