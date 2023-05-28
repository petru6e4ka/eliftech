const fs = require("fs");
const { Shop } = require("../models/shop");
const connectionDB = require("./mongo");

const file = "./app/src/database/data.json";

const seed = async () => {
  await connectionDB().then(() => {
    try {
      const result = [];

      fs.createReadStream(file)
        .on("data", (data) => {
          result.push(data);
        })
        .on("end", async () => {
          const data = JSON.parse(result.toString());

          await Shop.insertMany(data)
            .then(() => {
              console.log("Shops data is imported to mongo");
            })
            .catch((err) => {
              console.log("ERROR: ", err);
            })
            .finally(() => {
              process.exit();
            });
        });
    } catch (err) {
      console.log("ERROR: ", err);
    }
  });
};

seed();
