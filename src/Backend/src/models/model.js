import tf from '@tensorflow/tfjs-node';
import data from '../../assets/model.json' assert { type: 'json' };

let model;

const loadModel = async () => {
  console.log(data);
  model = await tf.loadLayersModel('../../assets/model.json');
};

loadModel();

const createSong = async (req, res) => {
  if (!model) {
    return res.status(500).send('Model not loaded yet');
  }

  const inputData = req.body.data;
  const tensor = tf.tensor(inputData);
  const prediction = model.predict(tensor);
  
  prediction.array().then(predictionArray => {
    res.json({
      prediction: predictionArray
    });
  });
};

export { createSong, loadModel };
