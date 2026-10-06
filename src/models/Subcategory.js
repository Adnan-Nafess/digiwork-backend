const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | Parent Category
    |--------------------------------------------------------------------------
    */

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Basic Information
    |--------------------------------------------------------------------------
    */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    |--------------------------------------------------------------------------
    | Rich Content
    |--------------------------------------------------------------------------
    */

    content: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    /*
    |--------------------------------------------------------------------------
    | Display Order
    |--------------------------------------------------------------------------
    */

    order: {
      type: Number,
      default: 0,
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
| Useful for queries involving parent category,
| publication status, and active state.
|
*/

subcategorySchema.index({
  category: 1,
  status: 1,
  isActive: 1,
  order: 1,
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
