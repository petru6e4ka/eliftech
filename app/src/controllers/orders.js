const mongoose = require("mongoose");
const { OrderShema } = require("../models/order");
const { ShopShema } = require("../models/shop");

const Order = mongoose.model("Order", OrderShema);
const Shop = mongoose.model("Shop", ShopShema);

const createOrder = async (req, res) => {
  try {
    const { shop_id, user, products } = req.body;
    const shop = await Shop.find({ _id: shop_id });
    const shopExist = !!shop.length;

    if (shopExist) {
      const productsExist = products.every((product) =>
        shop[0].products.find(
          (shopItem) =>
            shopItem.title === product.title && shopItem.price === product.price
        )
      );

      if (productsExist) {
        const newOrder = await new Order({ shop_id, user, products }).save();

        res.json(newOrder);
      }

      res.status(400).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = { createOrder };
