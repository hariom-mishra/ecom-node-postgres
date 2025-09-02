import express from "express";
import userRouter from "./routes/users.routes.js";
import { errorHandler } from "./middlewares/errorHanlder.middleware.js";
import productRouter from "./routes/products.routes.js";
const app = express();
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use(errorHandler)
export default app;