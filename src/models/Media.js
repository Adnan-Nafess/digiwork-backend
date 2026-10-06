const mongoose = require("mongoose");

const mediaReferenceSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["article", "category", "subcategory"],
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const mediaSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | Storage Provider
    |--------------------------------------------------------------------------
    */

    provider: {
      type: String,
      enum: ["cloudinary", "s3"],
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Provider Storage Key
    |--------------------------------------------------------------------------
    |
    | Cloudinary:
    | public_id
    |
    | S3:
    | object key
    |
    */

    storageKey: {
      type: String,
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Public URL
    |--------------------------------------------------------------------------
    */

    url: {
      type: String,
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | File Information
    |--------------------------------------------------------------------------
    */

    originalName: {
      type: String,
      default: "",
      trim: true,
    },

    mimeType: {
      type: String,
      default: "",
      trim: true,
    },

    size: {
      type: Number,
      default: 0,
      min: 0,
    },

    width: {
      type: Number,
      default: null,
    },

    height: {
      type: Number,
      default: null,
    },

    format: {
      type: String,
      default: "",
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Current References
    |--------------------------------------------------------------------------
    |
    | One image may be used by multiple articles/categories/subcategories.
    | Image is physically deleted only when this array becomes empty.
    |
    */

    usedBy: {
      type: [mediaReferenceSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

mediaSchema.index(
  {
    provider: 1,
    storageKey: 1,
  },
  {
    unique: true,
  },
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
