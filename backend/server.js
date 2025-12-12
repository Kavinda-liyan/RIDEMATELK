import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Vehicle Recommender API is Running...");
});
app.use("/public", express.static("public"));


app.post("/test-json", (req, res) => {
  console.log("req.body:", req.body);
  res.json({ received: req.body });
});

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/favorites", favouriteRoutes);

if (process.env.NODE_ENV === "test") {
  console.log("Test environment detected — skipping app.listen");
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
