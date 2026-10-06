const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    icon: {
      type: String,
      default: "",
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Publication Status
    |--------------------------------------------------------------------------
    */

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    /*
    |--------------------------------------------------------------------------
    | Active State
    |--------------------------------------------------------------------------
    */

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Index
|--------------------------------------------------------------------------
|
| Helps public queries that frequently filter by status + active state.
|
*/

categorySchema.index({
  status: 1,
  isActive: 1,
  order: 1,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
