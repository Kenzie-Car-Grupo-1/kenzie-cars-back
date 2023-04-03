import "dotenv/config";

import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then((_) => console.log("Database running"))
    .catch((err) => console.error("Databae not running", err));

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
  });
})();
