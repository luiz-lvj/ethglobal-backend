import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { submitData } from './controllers/dataController';
import { testEncrypt } from './controllers/crypto';
import { addTxHash, createUser, getCountTxHashByUser, getTxHashesByUser, getTxHashesByUserByUrl } from './controllers/user';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.post("/submit-data", async (req, res) => await submitData(req, res));

app.get("/", async (req, res) => await testEncrypt(req, res));


app.post("/user", async (req, res) => await createUser(req, res));
app.post("/txhash", async (req, res) => await addTxHash(req, res));
app.get("/txhash/:publicKey/user/count", async (req, res) => await getCountTxHashByUser(req, res));
app.get("/txhash/:publicKey/user", async (req, res) => await getTxHashesByUser(req, res));
app.get("/txhash/:publicKey/user/:url/url", async (req, res) => await getTxHashesByUserByUrl(req, res));

export default app;