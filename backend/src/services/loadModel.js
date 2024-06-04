const tf = require('@tensorflow/tfjs-node');
// const tflite = require('@tensorflow/tfjs-tflite')

async function loadModel() {
    return tf.loadGraphModel(process.env.MODEL_URL_JS);
}
module.exports = loadModel;