const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Missing required 'name' field"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
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
    orders: [
      {
        order_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
        },
      },
    ],
  },
  { collection: "users" },
  { collation: { locale: "en_US", strength: 1 } }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
