import { z } from 'zod';

export const step1Schema = z.object({
  email: z.email({
    error: 'Please enter a valid email address'
  }),
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters')
});

const MAX_FILE_SIZE = 5000000;
// Define acceptable image types
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const step2Schema = z.object({
  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  shippingAddress: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters')
});

export const step3Schema = z.object({
  cardNumber: z.string().min(2, 'Please enter a valid 16-digit card number'),
  cardholderName: z
    .string()
    .min(2, 'Cardholder name must be at least 2 characters')
    .max(100, 'Cardholder name must be less than 100 characters'),
  cvv: z.string().min(3, 'Please enter a valid CVV'),
  profile:
    typeof window === 'undefined' // Handle server-side rendering (SSR)
      ? z.any()
      : z
          .instanceof(File)
          //.transform((fileList) => fileList.item(0)!) // Transform FileList to the first File
          .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
          )
});

export const CombinedCheckoutSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape);

export type CombinedCheckoutType = z.infer<typeof CombinedCheckoutSchema>;
