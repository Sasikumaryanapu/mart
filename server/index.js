import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import order from "./routes/ordersRoutes.js "
import cart from "./routes/cartRoutes.js";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin:'*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/cart", cart);
app.use("/order", order);
app.use("/user", user); 
app.use("/products", product);

//mongoose
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL, PORT);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`server started at ${PORT}`));
  })
  .catch((error) => console.log("error while connecting to db : ", error));
