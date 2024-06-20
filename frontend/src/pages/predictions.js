import { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [predictionsPerPage] = useState(10); // Angka bisa disesuaikan
  const [selectedPredictions, setSelectedPredictions] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = () => {
    axios.get('https://chilifit-capstone-project.et.r.appspot.com/api/predictions')
      .then(response => {
        console.log('Predictions response:', response.data);
        setPredictions(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the predictions!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://chilifit-capstone-project.et.r.appspot.com/api/predictions/${id}`)
      .then(() => {
        fetchPredictions();
      })
      .catch(error => {
        console.error('There was an error deleting the prediction!', error);
      });
  };

  const handleSelectAll = () => {
    if (selectedPredictions.length === currentPredictions.length) {
      setSelectedPredictions([]);
    } else {
      setSelectedPredictions(currentPredictions.map(prediction => prediction.id));
    }
  };

  const handleSelect = (id) => {
    if (selectedPredictions.includes(id)) {
      setSelectedPredictions(selectedPredictions.filter(predictionId => predictionId !== id));
    } else {
      setSelectedPredictions([...selectedPredictions, id]);
    }
  };

  const handleDeleteSelected = () => {
    const promises = selectedPredictions.map(id => axios.delete(`https://chilifit-capstone-project.et.r.appspot.com/api/predictions/${id}`));
    Promise.all(promises)
      .then(() => {
        setSelectedPredictions([]);
        fetchPredictions();
      })
      .catch(error => {
        console.error('There was an error deleting the predictions!', error);
      });
  };

  const indexOfLastPrediction = currentPage * predictionsPerPage;
  const indexOfFirstPrediction = indexOfLastPrediction - predictionsPerPage;
  const currentPredictions = predictions.slice(indexOfFirstPrediction, indexOfLastPrediction);
  const totalPages = Math.ceil(predictions.length / predictionsPerPage);

  return (
    <div className="container">
      <h1 className="mt-4">Predictions</h1>
      {predictions.length === 0 ? <p>No predictions found.</p> : (
        <>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th><input type="checkbox" onChange={handleSelectAll} checked={selectedPredictions.length === currentPredictions.length} /></th>
                <th>ID</th>
                <th>Prediction Result</th>
                <th>Image URL</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPredictions.map(prediction => (
                <tr key={prediction.id}>
                  <td><input type="checkbox" checked={selectedPredictions.includes(prediction.id)} onChange={() => handleSelect(prediction.id)} /></td>
                  <td>{prediction.id}</td>
                  <td>{prediction.prediction_result}</td>
                  <td><a href={prediction.image_url} target="_blank" rel="noopener noreferrer">View Image</a></td>
                  <td>{new Date(prediction.created_at).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(prediction.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleDeleteSelected} disabled={selectedPredictions.length === 0}>Delete Selected</button>
            <div>
              <button className="btn btn-secondary me-2" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="btn btn-secondary ms-2" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
