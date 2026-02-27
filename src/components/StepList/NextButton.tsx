import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { Button } from '../ui/Button';

const NextButton = ({
  onClick,
  type,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { isLastStep } = useMultiStepForm();

  return (
    <Button
      className="text-white bg-black hover:bg-slate-950 transition-colors w-full py-6"
      type={type ?? 'button'}
      onClick={onClick}
      {...rest}
    >
      {isLastStep ? 'Submit' : 'Continue'}
    </Button>
  );
};

export default NextButton;
