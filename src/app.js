import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js"
import gameRouter from "./routes/GameRoutes.js";
import rentalsRouter from "./routes/RentalsRouter.js";


const app = express()

app.use(cors())

app.use(express.json())

app.use([authRouter])
app.use([gameRouter])
app.use([rentalsRouter])

const PORT = 5000

app.listen(PORT, () => console.log("subiu!!"))