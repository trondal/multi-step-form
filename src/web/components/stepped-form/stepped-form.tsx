import { z } from 'zod';
import { createContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { FormStep, MultiStepFormContextProps, SavedFormState } from '@/types';
import PrevButton from '@/web/components/stepped-form/prev-button';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CombinedCheckoutSchema,
  CombinedCheckoutType
} from '@/web/validators/checkout-flow.validator';
import ProgressIndicator from './progress-indicator';
import { useLocalStorage } from '@mantine/hooks';
import { useToast } from '@/web/hooks/use-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>(null);

type UploadResponse =
  | {
      ok: true;
      originalName: string;
      storedName: string;
      size: number;
      mimeType: string;
    }
  | { ok: false; error: string };

const MultiStepForm = ({
  steps,
  localStorageKey = 'multi-step-form'
}: {
  steps: FormStep[];
  localStorageKey: string;
}) => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [status, setStatus] = useState('');

  const methods = useForm<z.infer<typeof CombinedCheckoutSchema>>({
    resolver: zodResolver(CombinedCheckoutSchema),
    defaultValues: {
      email: 'trond.albinussen@gmail.com',
      firstName: 'Trond',
      lastName: 'Albinussen',
      country: 'Norway',
      city: 'Oslo',
      shippingAddress: 'Grefsenveien 34C',
      cardholderName: 'Trond Albinussen',
      cardNumber: '5401854781835008',
      cvv: '501',
      profile: undefined
    }
  });

  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const [savedFormState, setSavedFormState] =
    useLocalStorage<SavedFormState | null>({
      key: localStorageKey,
      defaultValue: null
    });

  // Restore form state from LS
  useEffect(() => {
    if (savedFormState) {
      setCurrentStepIndex(savedFormState.currentStepIndex);
      methods.reset(savedFormState.formValues);
    }
  }, [methods, savedFormState]);

  const saveFormState = (stepIndex: number) => {
    const formValues = methods.getValues();
    setSavedFormState({
      currentStepIndex: stepIndex ?? currentStepIndex,
      formValues
    });
  };

  const clearFormState = () => {
    setSavedFormState(null);
    setCurrentStepIndex(0);
    methods.reset();
    window.localStorage.removeItem(localStorageKey);
  };

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
      saveFormState(currentStepIndex + 1);
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      saveFormState(currentStepIndex - 1);
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (position: number) => {
    if (position >= 0 && position - 1 < steps.length) {
      saveFormState(position - 1);
      setCurrentStepIndex(position - 1);
    }
  };

  async function submitSteppedForm(
    data: z.infer<typeof CombinedCheckoutSchema>
  ) {
    try {
      console.log(data);

      /*if (!file) {
        setStatus('Pick a file first.');
        return;
      }*/

      /*const form = new FormData();
      form.append('file', data.profile as File);
      form.append('email', data.cardNumber);
      form.append('firstName', data.cardholderName);
      form.append('lastName', data.cvv);
      form.append('country', data.cvv);
      form.append('city', data.cvv);
      form.append('shippingAddress', data.cvv);
      form.append('cardNumber', data.cvv);
      form.append('cardholderName', data.cvv);
      form.append('cvv', data.cvv);
      form.append('profile', data.profile as File);*/

      try {
        /*const res = await axios.post<UploadResponse>(
          'http://localhost:5174/api/data',
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );

                setUploadPercentage(percentCompleted);
              }
            }
          }
        );*/

        const res = await axios.post<UploadResponse>(
          'http://localhost:5174/api/data',
          data
        );
        const result = res.data;

        if (!result.ok) {
          setStatus(
            `Upload failed: ${'error' in result ? result.error : res.statusText}`
          );
          return;
        }

        setStatus(
          `Uploaded: ${result.originalName} -> ${result.storedName} (${String(result.size)} bytes, ${result.mimeType})`
        );
        toast({
          title: 'Form Submitted Successfully!',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(result, null, 2)}
              </code>
            </pre>
          )
        });
      } catch (error) {
        console.error('Upload error:', error);
        setUploadPercentage(0); // Reset or set to error state
      }

      //const res = await axios.post('/api/upload', data);

      // Perform your form submission logic here
      toast({
        title: 'Form Submitted Successfully!',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });
      clearFormState();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

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
        <div className="w-[550px] mx-auto">
          <ProgressIndicator />
          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>
            <h1 className="py-5 text-3xl font-bold">{currentStep.title}</h1>
            {currentStep.component}
            <PrevButton />
          </form>
        </div>
        <div>{uploadPercentage} %</div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
