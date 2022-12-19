import  Express  from "express";
import tasksRoutes from './routes/tasks'
import morgan from 'morgan'
import cors from 'cors'
import { options } from "./swaggerOptions";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const specs = swaggerJSDoc(options)

const app = Express();

app.use(cors())
app.use(morgan('dev'))
app.use(Express.json())

app.use(tasksRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app;