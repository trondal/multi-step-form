import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { CombinedCheckoutSchema } from '../../validators/schema';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { NextButton } from '../../components/StepList/NextButton';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

const Step3 = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>();

  const { nextStep } = useMultiStepForm();

  const handleStepSubmit = async () => {
    nextStep();
  };

  return (
    <div>
      <div>
        <input type="file" {...register('fil')} name="fil" />
        <ErrorMessage message={errors.fil?.message} />
      </div>
      <NextButton type="submit" onClick={handleStepSubmit} />
    </div>
  );
};

export default Step3;
