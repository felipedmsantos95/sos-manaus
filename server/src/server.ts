import express from 'express';
import routes from './routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const httpPort  = 3333;

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(httpPort, () => {
    console.log('[SOS Manaus] Server running on port ' + httpPort);
});
