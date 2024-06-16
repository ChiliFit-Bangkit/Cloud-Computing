const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { postArticle, getAllArticles, updateArticleById, deleteArticleById, getArticlesRelatedToPrediction } = require('../controllers/articleController');

// Ensure /tmp/uploads directory exists
const uploadDir = '/tmp/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer to use /tmp/uploads
const upload = multer({ dest: uploadDir });

const router = express.Router();

router.post('/articles', upload.single('image_file'), postArticle);
router.get('/articles', getAllArticles);
router.put('/articles/:id', updateArticleById);
router.delete('/articles/:id', deleteArticleById);
router.get('/articles/related', getArticlesRelatedToPrediction);

module.exports = router;
