const tf = require('@tensorflow/tfjs-node');

let model;

const loadModel = async () => {
    try {
        model = await tf.loadLayersModel('file://./taylor_swift_js/model.json'); // Only Total Paths
    } catch (error) {
        console.error('Error loading model:', error);
    }
};

loadModel();

const createSong = (req, res) => {

};

export { createSong };

