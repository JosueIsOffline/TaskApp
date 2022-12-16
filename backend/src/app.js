import  Express  from "express";
import tasksRoutes from './routes/tasks'

const app = Express();
app.use(tasksRoutes)

export default app;