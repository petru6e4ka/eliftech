const { getAllShops, getOneShopProducts } = require("../controllers/shops");
const { createOrder } = require("../controllers/orders");
const {
  userValidation,
  productValidation,
  shopValidation,
} = require("../middlewares/orderValidation");

const routes = (app) => {
  app.route("/shops").get(getAllShops);

  app.route("/shops/:shopId").get(getOneShopProducts);
  app
    .route("/order")
    .post(userValidation(), productValidation(), shopValidation(), createOrder);
};

module.exports = routes;
