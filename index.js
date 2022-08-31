import express from 'express';
import cors from 'cors';


const port = 3000;

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())


app.listen(port, () => console.log('Service listening on Port', port));