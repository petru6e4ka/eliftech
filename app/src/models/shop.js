const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShopSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "Missing required shop 'title' field"],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
        },
        price: {
          type: Number,
          required: [true, "Missing required 'price' field"],
        },
        title: {
          type: String,
          required: [true, "Missing required product 'title' field"],
          trim: true,
        },
        imageUrl: {
          type: String,
          required: [true, "Missing required 'imageUrl' field"],
          trim: true,
        },
      },
    ],
  },
  { collection: "shops" },
  { collation: { locale: "en_US", strength: 1 } }
);

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = { Shop, ShopSchema };
