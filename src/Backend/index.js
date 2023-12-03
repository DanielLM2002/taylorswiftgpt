const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const tf = require("@tensorflow/tfjs-node");
let model;

async function loadModel() {
  try {
    model = await tf.loadLayersModel("file://./taylor_swift_js/model.json"); // Only Total Paths
  } catch (error) {
    console.error("Error loading model:", error);
  }
}

loadModel();

app.use(express.json()); // for reading application/json
app.use(cors()); // Enable CORS

app.post("/api/taylorswiftmodel", (req, res) => {
  // // Check if the model is loaded
  // if (!model) {
  //     return res.status(500).send('Model not loaded yet');
  // }

  // const inputData = req.body.data;
  // if (!Array.isArray(inputData)) {
  //     return res.status(400).send('Input data must be an array');
  // }
  // const tensor = tf.tensor(inputData);
  // console.log('Input Data:', inputData);
  // const prediction = model.predict(tensor);

  // prediction.array().then(predictionArray => {
  //     res.json({
  //         prediction: predictionArray
  //     });
  // });
  try {
    // const { config } = req.body;
    // if (!model) {
    //   return res.status(500).send("Model not loaded yet");
    // }

    // const tensor = tf.tensor(config);
    // const prediction = model.predict(tensor);
    res.json([
      "Thought I found a way,",
      "Thought I found a way out (found)"
      
    ]);

    // prediction.array().then((predictionArray) => {
    //   res.json({
    //     prediction: predictionArray,
    //   });
    // });
  } catch (error) {}
});
function generateText(model, startString, temperature) {
  // Number of characters to generate
  const numGenerate = 300;

  // Converting the start string to numbers (vectorizing)
  const inputEval = startString.split("").map((char) => char2idx[char]);
  const inputEvalTensor = tf.expandDims(inputEval, 0);

  // Empty string to store the generated text
  const textGenerated = [];

  // Lower temperature results in more predictable text.
  // Higher temperature results in more surprising text.
  // Experiment to find the best setting.

  model.resetStates();
  for (let i = 0; i < numGenerate; i++) {
    const predictions = model(inputEvalTensor);
    // Remove the batch dimension
    const squeezedPredictions = tf.squeeze(predictions, 0);

    // Using a categorical distribution to predict the character returned by the model
    const normalizedPredictions = tf.div(squeezedPredictions, temperature);
    const predictedId = tf.random
      .categorical(normalizedPredictions, 1)
      [(-1, 0)].numpy();

    // Pass the predicted character as the next input to the model
    // along with the previous hidden state
    const nextInputEval = tf.expandDims([predictedId], 0);

    textGenerated.push(idx2char[predictedId]);

    inputEvalTensor = nextInputEval;
  }

  return startString + textGenerated.join("");
}

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:${PORT}");
});
