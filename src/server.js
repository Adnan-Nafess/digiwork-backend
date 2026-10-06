require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Backend running"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err.message));

app.listen(PORT, "0.0.0.0", () => console.log("Server on", PORT));

require("dotenv").config();

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
