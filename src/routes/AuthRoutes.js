import { getCustomers, putCustomers, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { userSchema } from '../schema/AuthSchema.js'

const authRouter = Router()

authRouter.post("/customers", validateSchema(userSchema), signUp)
authRouter.get("/customers/:id?", getCustomers)
authRouter.put("/customers/:id", validateSchema(userSchema), putCustomers)

export default authRouter