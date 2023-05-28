const { getAllShops, getOneShop } = require("../controllers/shops");

const routes = (app) => {
  app.route("/shops").get(getAllShops);

  app.route("/shops/:shopId").get(getOneShop);
};

module.exports = routes;
