const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    readingTime: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

articleSchema.index({ subcategory: 1, slug: 1 }, { unique: true });

articleSchema.index({
  status: 1,
  isActive: 1,
  createdAt: -1,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;