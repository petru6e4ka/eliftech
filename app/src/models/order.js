const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "orders" },
  { collation: { locale: "en_US", strength: 1 } }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
