const db = require('../config/dbConfig');

const insertPrediction = (predictionResult, imageUrl) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    db.query(
      'INSERT INTO predictions (prediction_result, image_url, created_at) VALUES (?, ?, ?)',
      [predictionResult, imageUrl, createdAt],
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

const getPredictions = (offset, limit) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM predictions LIMIT ? OFFSET ?',
      [limit, offset],
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

const updatePrediction = (id, predictionResult) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE predictions SET prediction_result = ? WHERE id = ?',
      [predictionResult, id],
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

const deletePrediction = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM predictions WHERE id = ?',
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

const getArticles = (offset, limit) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM articles LIMIT ? OFFSET ?',
      [limit, offset],
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

const updateArticle = (id, title, description) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE articles SET title = ?, description = ? WHERE id = ?',
      [title, description, id],
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

const getArticlesByPrediction = (predictionResult, offset, limit) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM articles WHERE title LIKE ? LIMIT ? OFFSET ?',
        [`%${predictionResult}%`, limit, offset],
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
  
  module.exports = { 
    insertPrediction, 
    getPredictions, 
    updatePrediction, 
    deletePrediction, 
    insertArticle, 
    getArticles, 
    updateArticle, 
    deleteArticle, 
    getArticlesByPrediction 
  };