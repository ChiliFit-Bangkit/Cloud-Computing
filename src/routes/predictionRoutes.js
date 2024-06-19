const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { postPrediction, getAllPredictions, updatePredictionById, deletePredictionById } = require('../controllers/predictionController');

// Ensure /tmp/uploads directory exists
const uploadDir = '/tmp/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer to use /tmp/uploads
const upload = multer({ dest: uploadDir });

const router = express.Router();

router.post('/predictions', upload.single('image_file'), postPrediction);
router.get('/predictions', getAllPredictions);
router.put('/predictions/:id', updatePredictionById);
router.delete('/predictions/:id', deletePredictionById);

module.exports = router;
