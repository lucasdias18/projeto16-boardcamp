import { getCustomers, putCustomers, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { userSchema } from '../schema/AuthSchema.js'

const authRouter = Router()

// Rotas de autenticação
authRouter.post("/customers", validateSchema(userSchema), signUp)
authRouter.get("/customers/:id?", getCustomers)
authRouter.put("/customers/:id", validateSchema(userSchema), putCustomers)
// authRouter.post("/login", validateSchema(loginSchema), login)

export default authRouter