import express from 'express';
import cors from 'cors';
//import connectDatabase from './mongodb/connect.js'

const port = 3000;

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())


// try {
//     connectDatabase();
//   } catch (e) {
//     console.error(e);
//   }

app.listen(port, () => console.log('Service listening on Port', port));