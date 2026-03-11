import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const step1Schema = z.object({
  firstName: z
    .string()
    .min(3, { error: 'First name must be at least 3 characters' }),
  lastName: z
    .string()
    .min(3, { error: 'Last name must be at least 3 characters' }),
  email: z.string().min(2, { error: 'Please enter a valid email address' })
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
  file: z
    .custom<FileList>((val) => val instanceof FileList, 'Required')
    .refine((files) => files.length > 0, 'At least one file is required.')

    .refine(
      (files) => files.length <= 5,
      'You can upload a maximum of 5 files.'
    )
    .refine((files) => {
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, `Each file must be less than 5MB.`)
    .refine((files) => {
      return Array.from(files).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.')
});

export const step4Schema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, {
    error: 'Please enter a valid 16-digit card number'
  }),
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
