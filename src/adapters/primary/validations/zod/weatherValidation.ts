import { z } from 'zod';

const get = z.strictObject({
  city: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
  const hasCity = !!data.city;
  const hasLat = data.lat !== undefined;
  const hasLng = data.lng !== undefined;

  if (hasCity && (hasLat || hasLng)) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'city must not be present along with lat and lng',
      path: ['city'],
    });
  }

  if (hasLat !== hasLng) {
    const params = hasLat ? { missing: 'lng', valid: 'lat' } : { missing: 'lat', valid: 'lng' };
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${params.missing} must be present with ${params.valid}`,
      path: [params.missing],
    });
  }

  if (!hasCity && !hasLat && !hasLng) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one field must be provided',
      path: ['city', 'lng', 'lat'],
    });
  }
  return true;
});

export const weatherValidation = {
  get,
};
