import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { resolve } from 'path';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use('/files', express.static(resolve('downloads')));

app.listen(process.env.PORT, () => 'Server is up and running');
