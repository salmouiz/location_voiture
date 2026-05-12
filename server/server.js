import "dotenv/config"
import express from "express"
import cors from "cors"
import prisma from "./config/lib/prisma.js"


//await connectDB()


const app = express()  //initialize express application
app.use(cors())   //enables cross-origin resource sharing

//middleware setup
app.use(express.json()) //enables json request body parsing


//Route endpoint to check AP status
app.get('/', (req,res) => res.send("API Conecté avec succès"))

const port = process.env.PORT || 4000  //Define server port

//start the server
app.listen(port, ()=> console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`))