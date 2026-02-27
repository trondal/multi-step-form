import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { Button } from '../ui/Button';

const PrevButton = () => {
  const { isFirstStep, previousStep } = useMultiStepForm();

  return (
    <Button
      variant="outline"
      type="button"
      className="mt-5"
      onClick={previousStep}
      disabled={isFirstStep}
    >
      Previous
    </Button>
  );
};

export default PrevButton;
