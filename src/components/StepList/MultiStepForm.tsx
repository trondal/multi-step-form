import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
//import { useLocalStorage } from '@mantine/hooks';
import {
  type FormStep,
  type MultiStepFormContextProps
  //type SavedFormState
} from '../../types';
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

const MultiStepForm = ({
  steps,
  localStorageKey
}: {
  steps: FormStep[];
  localStorageKey: string;
}) => {
  const methods = useForm<z.infer<typeof CombinedCheckoutSchema>>({
    resolver: zodResolver(CombinedCheckoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      shippingAddress: '',
      cardholderName: '',
      cardNumber: '',
      cvv: ''
    }
  });

  console.log(localStorageKey);

  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  //const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  /*const [savedFormState, setSavedFormState] =
    useLocalStorage<SavedFormState | null>({
      key: localStorageKey,
      defaultValue: null
    });*/

  // Restore form state from LS
  /*useEffect(() => {
    if (savedFormState) {
      setCurrentStepIndex(savedFormState.currentStepIndex);
      methods.reset(savedFormState.formValues);
    }
  }, [methods, savedFormState]);*/

  /*const saveFormState = (stepIndex: number) => {
    const formValues = methods.getValues();
    setSavedFormState({
      currentStepIndex: stepIndex ?? currentStepIndex,
      formValues
    });
  };*/

  /*const clearFormState = () => {
    setSavedFormState(null);
    setCurrentStepIndex(0);
    methods.reset();
    window.localStorage.removeItem(localStorageKey);
  };*/

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

  async function submitSteppedForm(
    data: z.infer<typeof CombinedCheckoutSchema>
  ) {
    try {
      setOpen(true);
      setToastMessage(JSON.stringify(data, null, 2));
      //clearFormState();
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
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
