// import tf from '@tensorflow/tfjs-node';

// let model;

// const loadModel = async () => {
//     try {
//       model = await tf.loadLayersModel('/Users/daniellizano/Documents/SegundoSemestre2023/Web/song-generator/src/Backend/src/models/model.json');
//       console.log('Model loaded');
//     }
//     catch (err) {
//       console.log(err);
//     }
// };

// loadModel();

const createSong = async (req, res) => {
  try {
    const { config } = req.body;
  // if (!model) {
  //   return res.status(500).send('Model not loaded yet');
  // }

  // const tensor = tf.tensor(config);
  // const prediction = model.predict(tensor);
  
  // prediction.array().then(predictionArray => {
  //   res.json({
  //     prediction: predictionArray
  //   });
  // });
    res.json([
      `Thought I found a way`,
      `Thought I found a way out (found)`,
      `But you never go away (never go away)`,
      `So I guess I gotta stay now`,
      `Oh, I hope some day I'll make it out of here`,
      `Even if it takes all night or a hundred years`,
      `Need a place to hide, but I can't find one near`,
      `Wanna feel alive, outside I can't fight my fear`,
      `Isn't it lovely, all alone?`,
      `Heart made of glass, my mind of stone`,
      `Tear me to pieces, skin to bone`,
      `Hello, welcome home`,
      `Walkin' out of time`,
      `Lookin' for a better place (lookin' for a better place)`,
      `Something's on my mind (mind)`,
      `Always in my head space`,
      `But I know some day I'll make it out of here`,
      `Even if it takes all night or a hundred years`,
      `Need a place to hide, but I can't find one near`,
      `Wanna feel alive, outside I can't fight my fear`,
      `Isn't it lovely, all alone?`,
      `Heart made of glass, my mind of stone`,
      `Tear me to pieces, skin to bone`,
      `Hello, welcome home`,
      `Whoa, yeah`,
      `Yeah, ah`,
      `Whoa, whoa`,
      `Hello, welcome home`,
    ]);
  } catch (exception) {
    console.log(exception);
  }
};

export { createSong };
