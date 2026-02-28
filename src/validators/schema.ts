import { z } from 'zod';

export const step1Schema = z.object({
  email: z.string().min(2, { error: 'Please enter a valid email address' }),
  firstName: z
    .string()
    .min(3, { error: 'First name must be at least 3 characters' }),
  lastName: z
    .string()
    .min(3, { error: 'Last name must be at least 3 characters' })
});

export const step2Schema = z.object({
  country: z
    .string()
    .min(2, { error: 'Country must be at least 2 characters' })
    .max(100, { error: 'Country must be less than 100 characters' }),
  city: z
    .string()
    .min(2, { error: 'City must be at least 2 characters' })
    .max(100, { error: 'City must be less than 100 characters' }),
  shippingAddress: z
    .string()
    .min(5, { error: 'Address must be at least 5 characters' })
    .max(100, { error: 'Address must be less than 100 characters' })
});

export const step3Schema = z.object({
  fil: z
    .file()
    .max(1024 * 1024)
    .mime('image/png', { error: 'Only png files' })
});

export const step4Schema = z.object({
  cardNumber: z
    .string()
    .min(3, { error: 'CardNumber must be at least 3 characters' }),
  /*cardNumber: z.string().regex(/^[0-9]{16}$/, {
    error: 'Please enter a valid 16-digit card number'
  }),*/
  cardholderName: z
    .string()
    .min(2, { error: 'Cardholder name must be at least 2 characters' })
    .max(100, { error: 'Cardholder name must be less than 100 characters' }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, { error: 'Please enter a valid CVV' })
});

export const CombinedCheckoutSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape
});

export type CombinedCheckoutType = z.infer<typeof CombinedCheckoutSchema>;
