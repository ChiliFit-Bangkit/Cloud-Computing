const { uploadFile } = require('../services/storageService');
const { insertArticle, getArticles, updateArticle, deleteArticle, getArticlesByPrediction } = require('../models/articleModel');

const postArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const imageUrl = await uploadFile(file);
    const articleId = await insertArticle(title, description, imageUrl);

    res.status(200).send({
      status: 'success',
      data: {
        id: articleId,
        title,
        description,
        image_url: imageUrl,
        created_at: new Date()
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;
    const articles = await getArticles(offset, parseInt(size));

    res.status(200).send({ status: 'success', data: articles });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    await updateArticle(id, title, description);
    res.status(200).send({ status: 'success', message: 'Article updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteArticle(id);
    res.status(200).send({ status: 'success', message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getArticlesRelatedToPrediction = async (req, res) => {
  try {
    const { prediction_result } = req.query;
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;
    const articles = await getArticlesByPrediction(prediction_result, offset, parseInt(size));

    res.status(200).send({ status: 'success', data: articles });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { postArticle, getAllArticles, updateArticleById, deleteArticleById, getArticlesRelatedToPrediction };
