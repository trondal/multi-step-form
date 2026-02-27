import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const NextButton = ({
  onClick,
  type
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isLastStep } = useMultiStepForm();

  return (
    <Button
      onClick={onClick}
      type={type ?? 'button'}
      variant="contained"
      endIcon={<NavigateNextIcon />}
    >
      {isLastStep ? 'Submit' : 'Continue'}
    </Button>
  );
};

export { NextButton };
