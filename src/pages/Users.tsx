import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/axios';
import { Card, CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Users() {
  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: async ({ signal }) => await getUsers(signal),
    initialData: [],
    refetchOnWindowFocus: 'always'
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <List>
        {data.map((f) => (
          <div key={f.id}>
            <ListItem>{f.id}</ListItem>
            <ListItem>{f.firstName}</ListItem>
            <ListItem>{f.lastName}</ListItem>
            <ListItem>{f.email}</ListItem>
            <ListItem>{f.country}</ListItem>
            <ListItem>{f.city}</ListItem>
            <ListItem>{f.shippingAddress}</ListItem>
            <ListItem>{f.fileId}</ListItem>
            <ListItem>{f.cardNumber}</ListItem>
            <ListItem>{f.cardholderName}</ListItem>
            <ListItem>{f.cvv}</ListItem>
          </div>
        ))}
      </List>
    </Card>
  );
}

export { Users };
