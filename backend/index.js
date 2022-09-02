import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import quoteRoutes from "./routes/quotes.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/quotes", quoteRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to our quotes api")
})

const PORT = process.env.PORT || 5000

mongoose.connect("mongodb://mongo:Xw4KqMisyQirbBwA7t4D@containers-us-west-71.railway.app:5460", {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT,() => console.log(`Server is running on port ${PORT} and database is connected`)))
.catch((error) => console.log(error.message)) 

export default app;