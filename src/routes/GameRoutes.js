import { Router } from 'express'
import { getGames, postGame } from '../controller/Game.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { gameSchema } from '../schema/GameSchema.js'

const gameRouter = Router()

gameRouter.post("/games", validateSchema(gameSchema), postGame)
gameRouter.get("/games", getGames)


export default gameRouter