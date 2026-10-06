const {
  createArticle,
  getAllArticles,
  getLatestArticles,
  getArticlesBySubcategory,
  getArticleBySlug,
  updateArticle,
  deactivateArticle,
  activateArticle,
} = require("../services/article.service");

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {
  const article = await createArticle({
    ...req.body,
    authorId: req.admin._id,
  });

  res.status(201).json({
    success: true,
    message: "Article created successfully",
    data: article,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

const getAllAdmin = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);

  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

  const result = await getAllArticles(page, limit);

  res.status(200).json({
    success: true,
    message: "Articles fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET LATEST
|--------------------------------------------------------------------------
*/

const getLatest = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);

  const limit = Math.min(20, Math.max(1, parseInt(req.query.limit) || 6));

  const result = await getLatestArticles(page, limit);

  res.status(200).json({
    success: true,
    message: "Latest articles fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET BY SUBCATEGORY
|--------------------------------------------------------------------------
*/

const getAll = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);

  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));

  const result = await getArticlesBySubcategory(
    req.params.categorySlug,
    req.params.subcategorySlug,
    page,
    limit,
  );

  res.status(200).json({
    success: true,
    message: "Articles fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE
|--------------------------------------------------------------------------
*/

const getOne = async (req, res) => {
  const result = await getArticleBySlug(
    req.params.categorySlug,
    req.params.subcategorySlug,
    req.params.articleSlug,
  );

  res.status(200).json({
    success: true,
    message: "Article fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

const update = async (req, res) => {
  const article = await updateArticle(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    data: article,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

const deactivate = async (req, res) => {
  await deactivateArticle(req.params.id);

  res.status(200).json({
    success: true,
    message: "Article deactivated successfully",
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

const activate = async (req, res) => {
  await activateArticle(req.params.id);

  res.status(200).json({
    success: true,
    message: "Article activated successfully",
  });
};

module.exports = {
  create,
  getAllAdmin,
  getLatest,
  getAll,
  getOne,
  update,
  deactivate,
  activate,
};
