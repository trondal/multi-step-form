import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import TextField from '@mui/material/TextField';

import { CombinedCheckoutSchema } from '../../validators/schema';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { NextButton } from '../../components/StepList/NextButton';

const Step3 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>();

  const handleStepSubmit = async () => {
    return;
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <TextField
          fullWidth
          {...register('cardNumber')}
          placeholder="Card Number"
        />
        <ErrorMessage message={errors.cardNumber?.message} />
      </div>
      <div>
        <TextField
          fullWidth
          {...register('cardholderName')}
          placeholder="Card Holder Name"
        />
        <ErrorMessage message={errors.cardholderName?.message} />
      </div>
      <div>
        <TextField fullWidth {...register('cvv')} placeholder="CVV" />
        <ErrorMessage message={errors.cvv?.message} />
      </div>
      <NextButton type="submit" onClick={handleStepSubmit} />
    </div>
  );
};

export default Step3;
