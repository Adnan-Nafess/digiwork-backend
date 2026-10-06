const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| CREATE SUBCATEGORY
|--------------------------------------------------------------------------
*/

const createSubcategorySchema = z.object({
  categoryId: z.string().min(1),

  name: z.string().min(2).max(100),

  description: z.string().max(500).optional(),

  content: z.record(z.string(), z.any()).optional().nullable(),

  order: z.number().int().min(0).optional(),

  status: z.enum(["draft", "published"]).optional(),
});

/*
|--------------------------------------------------------------------------
| UPDATE SUBCATEGORY
|--------------------------------------------------------------------------
*/

const updateSubcategorySchema = z.object({
  categoryId: z.string().min(1).optional(),

  name: z.string().min(2).max(100).optional(),

  description: z.string().max(500).optional(),

  content: z.record(z.string(), z.any()).optional().nullable(),

  order: z.number().int().min(0).optional(),

  status: z.enum(["draft", "published"]).optional(),

  isActive: z.boolean().optional(),
});

module.exports = {
  createSubcategorySchema,
  updateSubcategorySchema,
};