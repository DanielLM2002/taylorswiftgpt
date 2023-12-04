const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const tf = require("@tensorflow/tfjs-node");
let model;

const loadModel = async () => {
  try {
    model = await tf.loadLayersModel("file://./taylor_swift_js/model.json");
  } catch (error) {
    console.error(error);
  }
};

const generateText = async (config) => {
  try {
    const {
      messages,
      temperature
    } = config;
    model = await tf.loadLayersModel("file://./taylor_swift_js/model.json");
    const startString = 'lovely';
    const charactersNumber = 300;
    const song = [];
    const vectorizedStartString = startString.split("").map((character) => character.charCodeAt(0));
    const tensor = tf.expandDims(vectorizedStartString, 0);
    console.log('Tensor: ', tensor);
    const predictions = model.predict(tensor);
    return song;
  } catch (error) {
    console.log(error);
  }
};

loadModel();
app.use(express.json());
app.use(cors());

app.post('/api/taylorswift/generateSong', (req, res) => {
  try {
    const { config } = req.body;
    if (!model) {
      return res.status(500).send("Model not loaded yet");
    }
    const arr = generateText(config);
    console.log(arr);

    return res.status(200).send([
      "Thought I found a way,",
      "Thought I found a way out (found)"
    ]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
