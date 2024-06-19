import { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddArticleModal from '../components/AddArticleModal';
import UpdateArticleModal from '../components/UpdateArticleModal';
import ViewArticleModal from '../components/ViewArticleModal';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios.get('https://chilifit-capstone-project.et.r.appspot.com/api/articles')
      .then(response => {
        console.log('Articles response:', response.data);
        setArticles(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  }, []);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleUpdate = (article) => {
    setSelectedArticle(article);
    setShowUpdateModal(true);
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`https://chilifit-capstone-project.et.r.appspot.com/api/articles/${id}`)
      .then(() => {
        setArticles(articles.filter(article => article.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the article!', error);
      });
  };

  const handleUpdateArticle = (updatedArticle) => {
    console.log('Updated article:', updatedArticle);
    setArticles(articles.map(article => (article.id === updatedArticle.id ? updatedArticle : article)));
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowViewModal(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Articles</h1>
      <button className="btn btn-primary mb-3 float-end" onClick={handleAdd}>Add Article</button>
      {articles.length === 0 ? <p>No articles found.</p> : (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleView(article)}>
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn btn-warning me-2" onClick={() => handleUpdate(article)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(article.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AddArticleModal show={showAddModal} onClose={closeModals} onAddArticle={(newArticle) => setArticles([...articles, newArticle])} />
      {selectedArticle && <UpdateArticleModal show={showUpdateModal} onClose={closeModals} article={selectedArticle} onUpdateArticle={handleUpdateArticle} />}
      {selectedArticle && <ViewArticleModal show={showViewModal} onClose={closeModals} article={selectedArticle} />}
    </div>
  );
}
