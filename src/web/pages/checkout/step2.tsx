import { useFormContext } from 'react-hook-form';
import { Input } from '@/web/components/ui/input';
import { z } from 'zod';
import { CombinedCheckoutSchema } from '@/web/validators/checkout-flow.validator';
import { useMultiStepForm } from '@/web/hooks/use-stepped-form';
import ErrorMessage from '@/web/components/ui/error-mesage';
import NextButton from '@/web/components/stepped-form/next-button';

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
    <div className="flex flex-col gap-3">
      <div>
        <Input
          {...register('country')}
          placeholder="Country"
          autoComplete="country-name"
        />
        <ErrorMessage message={errors.country?.message} />
      </div>
      <div>
        <Input
          {...register('city')}
          placeholder="City"
          autoComplete="address-level2"
        />
        <ErrorMessage message={errors.city?.message} />
      </div>
      <div>
        <Input
          {...register('shippingAddress')}
          placeholder="Shipping Address"
          autoComplete="street-address"
        />
        <ErrorMessage message={errors.shippingAddress?.message} />
      </div>
      <NextButton onClick={handleStepSubmit} />
    </div>
  );
};

export default Step2;
