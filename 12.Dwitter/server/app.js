import Express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import 'express-async-errors';

const app = express();
express.json();
helmet();

app.listen(8080);