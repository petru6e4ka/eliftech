const mongoose = require("mongoose");
const { ShopShema } = require("../models/shop");

const Shop = mongoose.model("Shop", ShopShema);

const getAllShops = async (_, res) => {
  try {
    const shops = await Shop.find({}, "_id title type");

    if (shops) {
      res.json(shops);
    }

    res.status(404).end();
  } catch (err) {
    res.status(500).end();
  }
};

const getOneShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId);

    if (shop) {
      res.json(shop);
    }

    res.status(404).end();
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = { getAllShops, getOneShop };
