const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");

const categoryRoutes = require("./routes/category.routes");
const adminCategoryRoutes = require("./routes/admin/category.routes");

const subcategoryAdminRoutes = require("./routes/admin/subcategory.routes");
const subcategoryRoutes = require("./routes/subcategory.routes");

const articleAdminRoutes = require("./routes/admin/article.routes");
const articleRoutes = require("./routes/article.routes");

const searchRoutes = require("./routes/search.routes");

const dashboardRoutes = require("./routes/admin/dashboard.routes");

const mediaRoutes = require("./routes/admin/media.routes");

const app = express();

app.use(helmet());

// const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| CATEGORY
|--------------------------------------------------------------------------
*/

app.use("/api/categories", categoryRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);

/*
|--------------------------------------------------------------------------
| SUBCATEGORY
|--------------------------------------------------------------------------
*/

app.use("/api/admin/subcategories", subcategoryAdminRoutes);

app.use("/api/categories", subcategoryRoutes);

/*
|--------------------------------------------------------------------------
| ARTICLE
|--------------------------------------------------------------------------
*/

app.use("/api/admin/articles", articleAdminRoutes);

app.use("/api/articles", articleRoutes);

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

app.use("/api/search", searchRoutes);

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

app.use("/api/admin/dashboard", dashboardRoutes);

/*
|--------------------------------------------------------------------------
| MEDIA
|--------------------------------------------------------------------------
*/

app.use("/api/admin/media", mediaRoutes);

/*
|--------------------------------------------------------------------------
| HEALTH
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/*
|--------------------------------------------------------------------------
| GLOBAL ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

module.exports = app;
