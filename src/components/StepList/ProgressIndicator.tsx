import CheckIcon from '@mui/icons-material/Check';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { checkoutSteps } from '../../pages/Home';
import {
  Box,
  IconButton,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { purple } from '@mui/material/colors';

export default function ProgressIndicator() {
  const { goToStep, currentStepIndex } = useMultiStepForm();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStepIndex}>
        {checkoutSteps.map((step) => {
          const isCompleted = currentStepIndex > step.position - 1;

          return (
            <Step
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onClick={() => goToStep(step.position)}
              key={step.position}
            >
              <StepLabel>
                <IconButton color="inherit">
                  {isCompleted ? (
                    <CheckIcon color="primary" />
                  ) : (
                    <step.icon
                      color={
                        currentStepIndex + 1 === step.position
                          ? 'primary'
                          : 'inherit'
                      }
                    />
                  )}
                </IconButton>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
          //bgcolor: '#f44336'
        }}
      >
        {/* Steps */}
        {checkoutSteps.map((step) => {
          const isCompleted = currentStepIndex > step.position - 1;
          const isCurrent = currentStepIndex === step.position - 1;

          return (
            <Box
              key={step.position}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <IconButton size="large" onClick={() => goToStep(step.position)}>
                {isCompleted ? <CheckIcon /> : <step.icon />}
              </IconButton>
              <Box
                sx={{
                  textAlign: 'center',
                  color: isCompleted || isCurrent ? '#2196f3' : purple[400]
                }}
                /* className={`absolute left-1/2 mt-2 -translate-x-1/2 text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-primary' : 'text-gray-500'
                }`} */
              >
                <Typography variant="caption" fontSize={'1.5rem'}>
                  {step.position}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <LinearProgress
        sx={{ height: 20, width: '100%' }}
        variant="determinate"
        value={(currentStepIndex / (checkoutSteps.length - 1)) * 100}
      />
    </div>
  );
}
