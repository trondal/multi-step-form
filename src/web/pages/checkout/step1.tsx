import NextButton from '@/web/components/stepped-form/next-button';
import ErrorMessage from '@/web/components/ui/error-mesage';
import { Input } from '@/web/components/ui/input';
import { useMultiStepForm } from '@/web/hooks/use-stepped-form';
import { CombinedCheckoutSchema } from '@/web/validators/checkout-flow.validator';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

const Step1 = () => {
  const {
    register,
    getValues,
    setError,
    formState: { errors }
  } = useFormContext<z.infer<typeof CombinedCheckoutSchema>>();

  const { nextStep } = useMultiStepForm();

  const handleStepSubmit = async () => {
    const { email } = getValues();

    if (email === 'test@test.com') {
      setError('email', {
        type: 'manual',
        message:
          'Email already exists in the database. Please use a different email.'
      });
      return;
    }

    nextStep();
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input
          {...register('email')}
          placeholder="Email"
          autoComplete="email"
        />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div>
        <Input
          {...register('firstName')}
          placeholder="First Name"
          autoComplete="given-name"
        />
        <ErrorMessage message={errors.firstName?.message} />
      </div>
      <div>
        <Input
          {...register('lastName')}
          placeholder="Last Name"
          autoComplete="family-name"
        />
        <ErrorMessage message={errors.lastName?.message} />
      </div>
      <NextButton onClick={handleStepSubmit} />
    </div>
  );
};

export default Step1;
