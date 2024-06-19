import React from 'react';

export default function ViewArticleModal({ show, onClose, article }) {
  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{article.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Description:</strong></p>
            <p>{article.description}</p>
            <p><strong>Image:</strong></p>
            <img src={article.image_url} alt={article.title} className="img-fluid" />
            <p><strong>Created At:</strong></p>
            <p>{new Date(article.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
