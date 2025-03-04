import { z } from 'zod';

const sum = z.record(z.any());

export const jsonValidation = {
  sum,
};
