import { useQuery } from '@tanstack/react-query';
import { getFiles } from '../services/axios';
import { Card, CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Files() {
  const { isLoading, data } = useQuery({
    queryKey: ['files'],
    queryFn: async ({ signal }) => await getFiles(signal),
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
            <ListItem>{f.fieldname}</ListItem>
            <ListItem>{f.originalname}</ListItem>
            <ListItem>{f.encoding}</ListItem>
            <ListItem>{f.mimetype}</ListItem>
            <ListItem>{f.destination}</ListItem>
            <ListItem>{f.filename}</ListItem>
            <ListItem>{f.path}</ListItem>
            <ListItem>{f.size}</ListItem>
          </div>
        ))}
      </List>
    </Card>
  );
}

export { Files };
