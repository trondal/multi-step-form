import { type FormStep } from '../types';
import Step1 from './checkout/Step1';
import Step2 from './checkout/Step2';
import {
  step1Schema,
  step2Schema,
  //step3Schema,
  step4Schema
} from '../validators/schema';
import MultiStepForm from '../components/StepList/MultiStepForm';
//import Step3 from './checkout/Step3';
import PersonIcon from '@mui/icons-material/Person';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Step4 from './checkout/Step4';

// eslint-disable-next-line react-refresh/only-export-components
export const checkoutSteps: FormStep[] = [
  {
    title: 'Step 1: Personal Information',
    component: <Step1 />,
    icon: PersonIcon,
    position: 1,
    validationSchema: step1Schema,
    fields: ['email', 'firstName', 'lastName']
  },
  {
    title: 'Step 2: Address Details',
    component: <Step2 />,
    icon: HomeFilledIcon,
    position: 2,
    validationSchema: step2Schema,
    fields: ['country', 'city', 'shippingAddress']
  },
  /* {
    title: 'Step 3: File upload',
    component: <Step3 />,
    icon: HomeFilledIcon,
    position: 3,
    validationSchema: step3Schema,
    fields: ['fil']
  }, */
  {
    title: 'Step 4: Payment Details',
    component: <Step4 />,
    icon: CreditCardIcon,
    position: 4,
    validationSchema: step4Schema,
    fields: ['cardNumber', 'cardholderName', 'cvv']
  }
];

export default function Home() {
  return (
    <div>
      <MultiStepForm steps={checkoutSteps} localStorageKey="checkout-form" />
    </div>
  );
}
