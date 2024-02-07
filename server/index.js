import express from 'express'
import { router } from './routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api", router)

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})