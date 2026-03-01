import { useFormContext } from 'react-hook-form';
import { Input } from '@/web/components/ui/input';
import { z } from 'zod';
import { CombinedCheckoutSchema } from '@/web/validators/checkout-flow.validator';
import ErrorMessage from '@/web/components/ui/error-mesage';
import NextButton from '@/web/components/stepped-form/next-button';

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
        <Input
          {...register('cardNumber')}
          placeholder="Card Number"
          autoComplete="cc-number"
        />
        <ErrorMessage message={errors.cardNumber?.message} />
      </div>
      <div>
        <Input
          {...register('cardholderName')}
          placeholder="Card Holder Name"
          autoComplete="cc-name"
        />
        <ErrorMessage message={errors.cardholderName?.message} />
      </div>
      <div>
        <Input {...register('cvv')} placeholder="CVV" autoComplete="cc-csc" />
        <ErrorMessage message={errors.cvv?.message} />
      </div>
      <div>
        <input
          id="profile"
          type="file"
          onChange={(e) =>
            register('profile').onChange({
              target: { name: 'profile', value: e.target.files?.[0] }
            })
          }
          name="profile"
          onBlur={register('profile').onBlur}
          ref={register('profile').ref}
        />
        <ErrorMessage message={errors.profile?.message?.toString()} />
      </div>

      <NextButton type="submit" onClick={handleStepSubmit} />
    </div>
  );
};

export default Step3;
