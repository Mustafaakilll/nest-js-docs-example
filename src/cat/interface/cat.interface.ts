import * as joi from 'joi';

export interface Cat {
  id: number;
  name: string;
}

export const createCatSchema = joi.object({
  id: joi.number().integer(),
  name: joi.string().alphanum(),
});
