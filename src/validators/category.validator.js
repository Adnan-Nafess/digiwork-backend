const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().min(2).max(100),

  description: z.string().max(500).optional(),

  content: z.record(z.string(), z.any()).optional().nullable(),

  icon: z.string().max(100).optional(),

  order: z.number().int().min(0).optional(),

  status: z.enum(["draft", "published"]).optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(2).max(100).optional(),

  description: z.string().max(500).optional(),

  content: z.record(z.string(), z.any()).optional().nullable(),

  icon: z.string().max(100).optional(),

  order: z.number().int().min(0).optional(),

  status: z.enum(["draft", "published"]).optional(),

  isActive: z.boolean().optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
