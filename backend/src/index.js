import dotenv from "dotenv";
import connecDB from "./db/index.js";
import { app } from "./app.js";
import router from "./routes/user.routes.js";
dotenv.config({
  path: "./.env",
});


const port = process.env.PORT || 5000;

connecDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Err: ", err);
      throw error;
    });

    app.listen(port, () => {
      console.log(`App is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED!!!", err);
  });
