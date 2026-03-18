import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { type FormStep, type MultiStepFormContextProps } from '../../types';
import { PrevButton } from './PrevButton';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CombinedCheckoutSchema,
  type CombinedCheckoutType
} from '../../validators/schema';
import ProgressIndicator from './ProgressIndicator';

import { MultiStepFormContext } from '../../pages/MultiStepFormContext';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useMutation } from '@tanstack/react-query';
import { postForm } from '../../services/axios';

const MultiStepForm = ({
  steps
}: {
  steps: FormStep[];
  localStorageKey: string;
}) => {
  const methods = useForm<z.infer<typeof CombinedCheckoutSchema>>({
    resolver: zodResolver(CombinedCheckoutSchema),
    defaultValues: {
      email: 'chester@nimitz.com',
      firstName: 'Chester',
      lastName: 'Nimitz',
      country: 'USA',
      city: 'Arlington',
      shippingAddress: 'Midway',
      cardholderName: 'Chester Nimitz',
      cardNumber: '5186001700009908',
      cvv: '134'
    }
  });

  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const nextStep = async () => {
    const isValid = await methods.trigger(currentStep.fields);

    if (!isValid) {
      return;
    }

    // grab values in current step and transform values to object
    const currentStepValues = methods.getValues(currentStep.fields);
    const formValues = Object.fromEntries(
      currentStep.fields.map((field, index) => [
        field,
        currentStepValues[index] || ''
      ])
    );

    // validate form values against schema and set errors
    if (currentStep.validationSchema) {
      const validationResult =
        currentStep.validationSchema.safeParse(formValues);

      if (!validationResult.success) {
        validationResult.error.issues.forEach((err) => {
          methods.setError(err.path.join('.') as keyof CombinedCheckoutType, {
            type: 'manual',
            message: err.message
          });
        });
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      //saveFormState(currentStepIndex + 1);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      //saveFormState(currentStepIndex - 1);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < steps.length) {
      //saveFormState(position - 1);
      setCurrentStepIndex(position - 1);
    }
  };

  const mutation = useMutation({
    mutationKey: ['post'],
    mutationFn: (data: FormData) => postForm(data)
  });

  async function submitSteppedForm(
    data: z.infer<typeof CombinedCheckoutSchema>
  ) {
    try {
      //clearFormState();

      const form = new FormData();
      form.append('email', data.email);
      form.append('firstName', data.firstName);
      form.append('lastName', data.lastName);
      form.append('country', data.country);
      form.append('city', data.city);
      form.append('shippingAddress', data.shippingAddress);
      form.append('file', data.file[0]);
      form.append('cardNumber', data.cardNumber);
      form.append('cardholderName', data.cardholderName);
      form.append('cvv', data.cvv);

      mutation.mutateAsync(form);
      /* const tres = await axios.post(`http://localhost:5174/api/upload`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); */
      /* if (!res.data.ok) {
        setToastMessage('Upload failed');
      } */
      setOpen(true);
      setToastMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const value: MultiStepFormContextProps = {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goToStep,
    nextStep,
    previousStep,
    steps
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...methods}>
        <div>
          <ProgressIndicator />
          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>
            <h1 className="">{currentStep.title}</h1>
            {currentStep.component}
            <PrevButton />
          </form>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{ maxWidth: 300 }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert severity="success">{toastMessage}</Alert>
          </Snackbar>
        </div>
      </FormProvider>
      <DevTool control={methods.control} />
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
