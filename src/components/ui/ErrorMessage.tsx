import Alert from '@mui/material/Alert';

interface Props {
  message?: string;
}

const ErrorMessage = ({ message }: Props) => {
  if (!message) return;
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorMessage;
