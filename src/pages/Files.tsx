'use client';
import axios from 'axios';
import type { FileResult } from '../api/server';
import { useEffect, useState } from 'react';

function Files() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FileResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get<FileResult[]>(
          `http://localhost:5174/files`
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <pre>
      {data.map((f) => (
        <div key={f.id}>
          <div>{f.id}</div>
          <div>{f.fieldname}</div>
          <div>{f.originalname}</div>
          <div>{f.encoding}</div>
          <div>{f.mimetype}</div>
          <div>{f.destination}</div>
          <div>{f.filename}</div>
          <div>{f.path}</div>
          <div>{f.size}</div>
        </div>
      ))}
    </pre>
  );
}

export { Files };
