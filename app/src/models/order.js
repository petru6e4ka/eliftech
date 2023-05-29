const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, "Missing required 'name' field"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Missing required 'email' field"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Missing required 'phone' field"],
        trim: true,
      },
      adress: {
        type: String,
        required: [true, "Missing required 'adress' field"],
        trim: true,
      },
    },
    products: [
      {
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
        quantity: {
          type: Number,
          required: [true, "Missing required 'quantity' field"],
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

module.exports = { Order, OrderSchema };
