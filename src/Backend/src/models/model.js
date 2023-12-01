import tf from '@tensorflow/tfjs-node';

let model;
const loadModel = async () => {
    model = await tf.loadLayersModel('../../assets/model.json');
};

loadModel();

const postModel = async (req, res) => {
    if (!model) {
        return res.status(500).send('Model not loaded yet');
    }

    // Asumiendo que los datos de entrada se reciben como arreglo JSON
    const inputData = req.body.data;
    const tensor = tf.tensor(inputData);
    const prediction = model.predict(tensor);

    // Convierte la predicción de tensor a arreglo JS
    prediction.array().then(predictionArray => {
        res.json({
            prediction: predictionArray
        });
    });
};


export default { postModel, loadModel };
