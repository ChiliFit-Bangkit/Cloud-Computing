const { uploadFile } = require('../services/storageService');
const { insertPrediction, getPredictions, updatePrediction, deletePrediction } = require('../services/databaseService');

const postPrediction = async (req, res) => {
  try {
    const { prediction_result } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const imageUrl = await uploadFile(file);
    const predictionId = await insertPrediction(prediction_result, imageUrl);

    res.status(200).send({
      status: 'success',
      data: {
        id: predictionId,
        prediction_result,
        image_url: imageUrl,
        created_at: new Date()
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllPredictions = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;
    const predictions = await getPredictions(offset, parseInt(size));

    res.status(200).send({ status: 'success', data: predictions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updatePredictionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { prediction_result } = req.body;

    await updatePrediction(id, prediction_result);
    res.status(200).send({ status: 'success', message: 'Prediction updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletePredictionById = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePrediction(id);
    res.status(200).send({ status: 'success', message: 'Prediction deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { postPrediction, getAllPredictions, updatePredictionById, deletePredictionById };
