import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const PrevButton = () => {
  const { isFirstStep, previousStep } = useMultiStepForm();

  return (
    <Button
      variant="contained"
      type="button"
      onClick={previousStep}
      disabled={isFirstStep}
      startIcon={<NavigateBeforeIcon />}
    >
      Previous
    </Button>
  );
};

export { PrevButton };
