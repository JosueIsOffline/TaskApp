import { Router } from "express";
import { getTasks } from '../controllers/tasks'

const router = Router()

router.get('/tasks', getTasks)

router.get('/tasks/count')

router.get('/tasks/:id')

router.get('/tasks')

router.get('/tasks/:id')

router.get('/tasks/:id')

export default router