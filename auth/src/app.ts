import express, { Request, Response} from 'express';
import { routes } from "@presentation/routes"
import dependecies from '@infra/config/dependencies'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler, NotFoundError } from '@muhammednajinnprosphere/common';


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use((req, res,  next) => {

    console.log(req.method, req.url);
   
    next();
})

app.use("/api/v1", routes(dependecies));



app.use("*", (req: Request, res: Response) => {
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };