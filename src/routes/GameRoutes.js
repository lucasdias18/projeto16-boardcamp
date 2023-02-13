import { Router } from 'express'
import { getGames, postGame } from '../controller/Game.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { gameSchema } from '../schema/GameSchema.js'

const gameRouter = Router()

// Rotas de autenticação
gameRouter.post("/games", validateSchema(gameSchema), postGame)
gameRouter.get("/games", getGames)
// gameRouter.put("/customers/:id", putCustomers)
// authRouter.post("/login", validateSchema(loginSchema), login)

export default gameRouter