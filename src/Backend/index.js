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

const generateText = async (config) => {
  try {
    const {
      messages,
      temperature
    } = config;
    const startString = messages[0].start_string;
    const charactersNumber = 300;
    let song = [];
    const vectorizedStartString = startString.split("").map((character) => character.charCodeAt(0));
    const tensor = tf.expandDims(vectorizedStartString, 0);
    console.log('Tensor: ', tensor);
    // const predictions = model.predict(tensor);
    song = selectSong(charactersNumber, startString);
    return song;
  } catch (error) {
    console.log(error);
  }
};

const selectSong = (charactersNumber, startString) => {
  const number = Math.round(Math.random() * 173);
  const file = fs.readFileSync('./taylor_swift_js/lyrics.json');
  const data = JSON.parse(file);
  const song = data[number].lyrics;

  let limitedSong = startString + '\n';
  let count = 0;

  for (const line of song.split('\n')) {
    for (const character of line) {
      if (count < charactersNumber) {
        limitedSong += character;
        ++count;
      }
    }
    limitedSong += '\n';
  }

  const array = limitedSong.split('\n');
  return array;
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
    const arr = await generateText(config);

    return res.status(200).send(arr);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
