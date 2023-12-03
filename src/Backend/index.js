const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
let model;


// async function loadModel() {
//     try {
//         model = await tf.loadLayersModel('file://model.json'); // Only Total Paths
//     } catch (error) {
//         console.error('Error loading model:', error);
//     }
// }
async function loadModel() {
    try {
        const modelData = await fs.readFileSync("./model.json") 
        console.log(modelData)// Only Total Paths
        model = await tf.loadLayersModel(modelData);

    }
    catch (error) {
        console.error('Error loading model:', error);
    }
}

loadModel();

// app.use(express.json());  // for reading application/json
// app.use(cors()); // Enable CORS

// app.post('/generate', (req, res) => {
//     // Check if the model is loaded
//     if (!model) {
//         return res.status(500).send('Model not loaded yet');
//     }

//     const inputData = req.body.data;
//     if (!Array.isArray(inputData)) {
//         return res.status(400).send('Input data must be an array');
//     }
//     const tensor = tf.tensor(inputData);
//     console.log('Input Data:', inputData);
//     const prediction = model.predict(tensor);

//     prediction.array().then(predictionArray => {
//         res.json({
//             prediction: predictionArray
//         });
//     });
// });

// app.listen(PORT, () => {
//     console.log('Server is running at http:localhost:${PORT}');
// });