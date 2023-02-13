import { Router } from 'express'
// import { validateSchema } from "../middleware/validateSchema.js"
import { finishRental, getRentals, postRental } from "../controller/Rentals.js"

const rentalsRouter = Router()

// Rotas de autenticação
rentalsRouter.post("/rentals", postRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", finishRental)
// rentalsRouter.delete("/rentals/:id", login)

export default rentalsRouter