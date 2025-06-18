import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/training/${id}/`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      <h1>作成結果</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
};

export default ResultPage;
