import tf from '@tensorflow/tfjs-node';

let model;

const loadModel = async () => {
    try {
      model = await tf.loadLayersModel('/Users/daniellizano/Documents/SegundoSemestre2023/Web/song-generator/src/Backend/src/models/model.json');
      console.log('Model loaded');
    }
    catch (err) {
      console.log(err);
    }
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
