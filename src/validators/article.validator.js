const { z } = require("zod");

const tiptapContentSchema = z
  .record(z.string(), z.any())
  .refine((content) => content?.type === "doc", {
    message: "Content must be a valid Tiptap document",
  });

const createArticleSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),

  subcategoryId: z.string().min(1, "Subcategory is required"),

  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters"),

  excerpt: z
    .string()
    .trim()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt cannot exceed 500 characters"),

  content: tiptapContentSchema,

  status: z.enum(["draft", "published"]).optional(),

  isActive: z.boolean().optional(),
});

const updateArticleSchema = z.object({
  categoryId: z.string().min(1, "Category is required").optional(),

  subcategoryId: z.string().min(1, "Subcategory is required").optional(),

  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters")
    .optional(),

  excerpt: z
    .string()
    .trim()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt cannot exceed 500 characters")
    .optional(),

  content: tiptapContentSchema.optional(),

  status: z.enum(["draft", "published"]).optional(),

  isActive: z.boolean().optional(),
});

module.exports = {
  createArticleSchema,
  updateArticleSchema,
};