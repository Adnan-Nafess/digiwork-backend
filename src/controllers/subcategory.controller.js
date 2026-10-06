const {
  createSubcategory,
  getSubcategories,
  getSubcategoryBySlug,
  getAllSubcategoriesForAdmin,
  updateSubcategory,
  deactivateSubcategory,
  activateSubcategory,
} = require("../services/subcategory.service");

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ALL
|--------------------------------------------------------------------------
*/

const getAll = async (req, res) => {
  const result = await getSubcategories(req.params.categorySlug);

  res.status(200).json({
    success: true,
    message: "Subcategories fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE
|--------------------------------------------------------------------------
*/

const getOne = async (req, res) => {
  const result = await getSubcategoryBySlug(
    req.params.categorySlug,
    req.params.subcategorySlug,
  );

  res.status(200).json({
    success: true,
    message: "Subcategory fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL
|--------------------------------------------------------------------------
*/

const getAllAdmin = async (req, res) => {
  const result = await getAllSubcategoriesForAdmin(req.params.categorySlug);

  res.status(200).json({
    success: true,
    message: "Admin subcategories fetched successfully",
    data: result,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {
  const subcategory = await createSubcategory(req.body);

  res.status(201).json({
    success: true,
    message: "Subcategory created successfully",
    data: subcategory,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

const update = async (req, res) => {
  const subcategory = await updateSubcategory(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Subcategory updated successfully",
    data: subcategory,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - DEACTIVATE
|--------------------------------------------------------------------------
*/

const deactivate = async (req, res) => {
  await deactivateSubcategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Subcategory deactivated successfully",
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - ACTIVATE
|--------------------------------------------------------------------------
*/

const activate = async (req, res) => {
  await activateSubcategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Subcategory activated successfully",
  });
};

module.exports = {
  getAll,
  getOne,
  getAllAdmin,
  create,
  update,
  deactivate,
  activate,
};
