import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Predictions() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    axios.get('https://chilifit-capstone-project.et.r.appspot.com/api/predictions')
      .then(response => {
        console.log('Predictions response:', response.data);  // Log data yang diterima
        setPredictions(response.data.data);  // Pastikan struktur data benar
      })
      .catch(error => {
        console.error('There was an error fetching the predictions!', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">Predictions</h1>
      {predictions.length === 0 ? <p>No predictions found.</p> : (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Prediction Result</th>
              <th>Image URL</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(prediction => (
              <tr key={prediction.id}>
                <td>{prediction.id}</td>
                <td>{prediction.prediction_result}</td>
                <td><a href={prediction.image_url} target="_blank" rel="noopener noreferrer">View Image</a></td>
                <td>{new Date(prediction.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
