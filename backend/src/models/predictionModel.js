const db = require('../config/dbConfig');

const insertArticle = (title, description, imageUrl) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    db.query(
      'INSERT INTO articles (title, description, image_url, created_at) VALUES (?, ?, ?, ?)',
      [title, description, imageUrl, createdAt],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};

const getArticles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM articles',
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM articles WHERE id = ?',
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const updateArticle = (id, title, description, imageUrl) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE articles SET title = ?, description = ?, image_url = ? WHERE id = ?',
      [title, description, imageUrl, id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM articles WHERE id = ?',
      [id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

const getArticlesByPrediction = (predictionResult) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM articles WHERE title LIKE ?',
      [`%${predictionResult}%`],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = { insertArticle, getArticles, getArticleById, updateArticle, deleteArticle, getArticlesByPrediction };
