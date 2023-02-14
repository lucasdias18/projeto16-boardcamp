import { Router } from 'express'
import { finishRental, getRentals, postRental } from "../controller/Rentals.js"
import { validateSchema } from '../middleware/validateSchema.js'
import { rentalSchema } from '../schema/RentalSchema.js'

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", finishRental)
// rentalsRouter.delete("/rentals/:id", login)

export default rentalsRouter