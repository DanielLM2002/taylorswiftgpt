const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const tf = require("@tensorflow/tfjs-node");
const fs = require('fs');
let model;

const loadModel = async () => {
  try {
    model = await tf.loadLayersModel("file://./taylor_swift_js/model.json");
  } catch (error) {
    console.error(error);
  }
};

const generateSong = async (config) => {
  try {
    const {
      messages,
      temperature
    } = config;

    const arr = [];
    const tensor = tf.tensor([messages[0].start_string, temperature]);
    const choruses = fs.readFileSync('./taylor_swift_js/choruses.txt', 'utf-8');

    const vocabSet = new Set(choruses);
    const vocab = Array.from(vocabSet).sort();

    const char2idx = {};
    vocab.forEach((char, idx) => {
      char2idx[char] = idx;
    });

    const idx2char = vocab;

    const startString = messages[0].start_string;
    const numGenerate = 300;
    let inputEval = startString.split('').map(s => char2idx[s]);
    inputEval = tf.tensor2d([inputEval]);
    model.resetStates();

    for (let i = 0; i < numGenerate; i++) {
      const predictions = await model.predict(inputEval);
      const predictionsSqueezed = predictions.squeeze();

      const predictionsScaled = predictionsSqueezed.div(temperature);
      const predictedId = tf.multinomial(predictionsScaled, 1).dataSync()[0];

      inputEval = tf.tensor2d([[predictedId]]);

      arr.push(idx2char[predictedId]);
    }

    const song = [startString];
    let line = '';

    for (const character of arr) {
      if (character === '\n') {
        if (line) {
          song.push(line);
        }
        line = '';
      } else {
        line += character;
      }
    }

    if (line) {
      song.push(line);
    }
    console.log(song);

    return song;
  } catch (error) {
    console.log(error);
  }
};

loadModel();
app.use(express.json());
app.use(cors());

app.post('/api/taylorswift/generateSong', async (req, res) => {
  try {
    const { config } = req.body;
    if (!model) {
      return res.status(500).send("Model not loaded yet");
    }
    const song = await generateSong(config);

    return res.status(200).send(song);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
