import { describe, expect, it } from 'vitest';
import { step2Schema } from './schema';
import { ZodError } from 'zod';

describe('schema', () => {
  it('step2schema should validate with ok data', () => {
    expect.assertions(1);

    const result = step2Schema.safeParse({
      country: 'NO',
      city: 'Oslo',
      shippingAddress: 'Carl Berner 45'
    });

    expect(result.error).toBeUndefined();
  });

  it('should not work', () => {
    expect.assertions(2);

    const result = step2Schema.safeParse({
      country: '',
      city: '',
      shippingAddress: ''
    });

    expect(result?.error).instanceOf(ZodError);
    expect(result?.error?.issues).toHaveLength(3);
  });
});
