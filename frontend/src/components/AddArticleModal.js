import { useState } from 'react';
import axios from 'axios';

export default function AddArticleModal({ show, onClose, onAddArticle }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image_file', imageFile);

    axios.post('https://chilifit-capstone-project.et.r.appspot.com/api/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        onAddArticle(response.data.data);
        onClose();
      })
      .catch(error => {
        console.error('There was an error adding the article!', error);
      });
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Article</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">Image File</label>
                <input type="file" className="form-control" id="imageFile" onChange={(e) => setImageFile(e.target.files[0])} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Article</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
