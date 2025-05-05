import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);

app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "tesing api is workng" });
});

export default app;
