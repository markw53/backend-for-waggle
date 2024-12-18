import express from "express";
import cors from "cors";
import dogsRoutes from "./routes/dogsRoutes.js";
import ownersRoutes from "./routes/ownersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dogs", dogsRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/users", usersRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
