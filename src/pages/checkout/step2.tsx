import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import TextField from '@mui/material/TextField';

import { CombinedCheckoutSchema } from '../../validators/schema';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { NextButton } from '../../components/StepList/NextButton';

const Step2 = () => {
  const {
    register,
    // trigger,
    formState: { errors }
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>();

  const { nextStep } = useMultiStepForm();

  const handleStepSubmit = async () => {
    nextStep();
  };

  return (
    <div>
      <div>
        <TextField fullWidth {...register('country')} placeholder="Country" />
        <ErrorMessage message={errors.country?.message} />
      </div>
      <div>
        <TextField fullWidth {...register('city')} placeholder="City" />
        <ErrorMessage message={errors.city?.message} />
      </div>
      <div>
        <TextField
          fullWidth
          {...register('shippingAddress')}
          placeholder="Shipping Address"
        />
        <ErrorMessage message={errors.shippingAddress?.message} />
      </div>
      <NextButton onClick={handleStepSubmit} />
    </div>
  );
};

export default Step2;
