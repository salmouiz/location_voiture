import "dotenv/config"
import express from "express"
import cors from "cors"
import prisma from "./config/lib/prisma.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"


//await connectDB()


const app = express()  //initialize express application
app.use(cors())   //enables cross-origin resource sharing

//middleware setup
app.use(express.json()) //enables json request body parsing
app.use(clerkMiddleware())


//Route endpoint to check AP status
app.use("/api/clerk", clerkWebhooks)
app.get('/', (req,res) => res.send("API Conecté avec succès"))

const port = process.env.PORT || 4000  //Define server port

//start the server
app.listen(port, ()=> console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`))
export default app;