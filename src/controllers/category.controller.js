const {
  createCategory,
  getCategories,
  getAllCategoriesForAdmin,
  getCategoryBySlug,
  updateCategory,
  deactivateCategory,
  activateCategory,
} = require("../services/category.service");

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {
  const category = await createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ALL
|--------------------------------------------------------------------------
*/

const getAll = async (req, res) => {
  const categories = await getCategories();

  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

const getAllAdmin = async (req, res) => {
  const categories = await getAllCategoriesForAdmin();

  res.status(200).json({
    success: true,
    message: "Admin categories fetched successfully",
    data: categories,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE
|--------------------------------------------------------------------------
*/

const getOne = async (req, res) => {
  const category = await getCategoryBySlug(req.params.categorySlug);

  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

const update = async (req, res) => {
  const category = await updateCategory(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

const deactivate = async (req, res) => {
  const category = await deactivateCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deactivated successfully",
    data: category,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

const activate = async (req, res) => {
  const category = await activateCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category activated successfully",
    data: category,
  });
};

module.exports = {
  create,
  getAll,
  getAllAdmin,
  getOne,
  update,
  deactivate,
  activate,
};
