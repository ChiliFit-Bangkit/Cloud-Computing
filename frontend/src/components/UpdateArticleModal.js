import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateArticleModal({ show, onClose, article, onUpdateArticle }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setImageFile(null);
    }
  }, [article]);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) formData.append('image_file', imageFile);

    axios.put(`https://chilifit-capstone-project.et.r.appspot.com/api/articles/${article.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const updatedArticle = {
          id: article.id,
          title,
          description,
          image_url: response.data.data?.image_url || article.image_url, // Gunakan article.image_url jika image_url tidak tersedia
          created_at: article.created_at,
        };
        console.log('Update response:', response.data);
        onUpdateArticle(updatedArticle);
        onClose();
      })
      .catch(error => {
        console.error('There was an error updating the article!', error);
      });
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Article</h5>
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
                <input type="file" className="form-control" id="imageFile" onChange={handleFileChange} />
              </div>
              <button type="submit" className="btn btn-primary">Update Article</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
