import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/auth", authRoutes);

app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "tesing api is workng" });
});

export default app;
