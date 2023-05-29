const { validationResult, body } = require("express-validator");

const errorCollecting = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

const userValidation = () => {
  return [
    body("user.name").notEmpty().isLength({ min: 2 }),
    body("user.email").notEmpty().isEmail(),
    body("user.phone").notEmpty().isMobilePhone(),
    body("user.adress").notEmpty(),
    errorCollecting,
  ];
};

const productValidation = () => {
  return [
    body("products").isArray({ min: 1 }),
    body("products.*.price").notEmpty().isNumeric(),
    body("products.*.title").notEmpty(),
    body("products.*.imageUrl").notEmpty(),
    body("products.*.quantity").notEmpty().isNumeric({ min: 1 }),
    errorCollecting,
  ];
};

const shopValidation = () => {
  return [
    body("shop_id").notEmpty().isLength({ min: 24, max: 24 }),
    errorCollecting,
  ];
};

module.exports = {
  userValidation,
  productValidation,
  shopValidation,
};
