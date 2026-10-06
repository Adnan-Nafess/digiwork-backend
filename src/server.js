require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Backend running"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err.message));

app.listen(PORT, "0.0.0.0", () => console.log("Server on", PORT));
