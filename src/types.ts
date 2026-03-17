import { ZodType } from 'zod';
import { type CombinedCheckoutType } from './validators/schema';
import { type SvgIconComponent } from '@mui/icons-material';

type FieldKeys = keyof CombinedCheckoutType;

export interface MultiStepFormContextProps {
  currentStep: FormStep;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  steps: FormStep[];
}

export type FormStep = {
  title: string;
  component: React.ReactElement;
  icon: SvgIconComponent;
  position: number;
  validationSchema: ZodType<unknown>;
  fields: FieldKeys[];
};
export type SavedFormState = {
  currentStepIndex: number;
  formValues: Record<string, unknown>;
};

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  shippingAddress: string;
  fileId: number;
  cardNumber: number;
  cardholderName: string;
  cvv: number;
};
