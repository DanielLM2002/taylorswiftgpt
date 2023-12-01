import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import modelRoutes from './routes/modelRoutes.js';

dotenv.config();
const app = express();
const corsOptions = {};
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';



app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', modelRoutes); 

app.listen(port, host, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
