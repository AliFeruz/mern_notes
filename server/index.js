import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import { register } from "./controllers/auth.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import noteRouter from "./routes/notes.js"
import { verifyToken } from "./middleware/auth.js";
import { createUserNote } from "./controllers/notes.js";

dotenv.config();
const app = express();

const corsOptions = {
    origin: "https://crudnote.onrender.com", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true}));

app.use(cors());

app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.post("/notes", verifyToken, createUserNote);
app.use("/notes", noteRouter)



app.get('/', async(req, res) => {
    res.send('Hello from Ali!');
});

const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log(error)
    }
};

startServer();