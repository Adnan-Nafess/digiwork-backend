require("dotenv").config(); // sirf ek baar, sabse upar

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
const net = require("net");

const app = express();

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

// --- temporary debug (kaam hone ke baad hata dena) ---
console.log("ENV CHECK -> URI set:", !!uri, "| length:", uri ? uri.length : 0);

if (uri) {
  const host = new URL(uri).hostname;
  dns.resolveSrv("_mongodb._tcp." + host, (err, records) => {
    if (err) return console.log("DNS CHECK failed:", err.code);
    console.log("DNS CHECK ok, hosts:", records.length);
    records.forEach((r) => {
      const s = net.connect({ host: r.name, port: r.port, timeout: 5000 });
      s.on("connect", () => {
        console.log("TCP OK:", r.name);
        s.destroy();
      });
      s.on("timeout", () => {
        console.log("TCP TIMEOUT:", r.name);
        s.destroy();
      });
      s.on("error", (e) => console.log("TCP ERROR:", r.name, e.code));
    });
  });
}
// ------------------------------------------------------

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running"));

// apne purane routes yahan rakho, jaise:
// app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err.reason || err.message));

app.listen(PORT, "0.0.0.0", () => console.log("Server on", PORT));
