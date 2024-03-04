import express from'express'
import { sessionStart,getAgents,supervisorLogin,getAgentsByOrgId } from './router.js'
const router = express.Router()





router.post("/init" , sessionStart)
router.get("/agent" , getAgents)
router.post('/sup' ,supervisorLogin)
router.get('/agents' , getAgentsByOrgId)









export default router