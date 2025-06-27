const port = 3008;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://bjjacome1:QupsBmuC8eF5Gx6G@cluster0.qifsvqo.mongodb.net/BlakBoxPersonal?retryWrites=true&w=majority&appName=Cluster0`,{useNewUrlParser: true}
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("System connected to MongoDb Database"));

app.use(express.json());

const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");

app.use("/computerstore", userRouter);
app.use("/computerstore", categoryRouter);
app.use("/computerstore", productRouter);

app.listen(port, '0.0.0.0', () =>
  console.log("MY Computer Store Server is running on port ---> " + port)
);

