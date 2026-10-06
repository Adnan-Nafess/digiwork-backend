require("dotenv").config(); // sirf ek baar, sabse upar

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// --- temporary debug (kaam hone ke baad hata dena) ---
const uri = process.env.MONGODB_URI;
console.log("ENV CHECK -> MONGODB_URI set:", !!uri);
console.log("ENV CHECK -> length:", uri ? uri.length : 0);
console.log("ENV CHECK -> starts with:", uri ? uri.slice(0, 14) : "N/A");
console.log(
  "ENV CHECK -> has quotes/space:",
  uri ? /^["'\s]|["'\s]$/.test(uri) : "N/A",
);
console.log(
  "ENV CHECK -> keys:",
  Object.keys(process.env).filter((k) => /MONGO|JWT|PORT/i.test(k)),
);
// ------------------------------------------------------

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running"));

// apne purane routes yahan rakho, jaise:
// app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err.message));

app.listen(PORT, "0.0.0.0", () => console.log("Server on", PORT));
