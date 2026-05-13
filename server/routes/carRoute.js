import express from "express"
import { upload } from "../middlewares/multer.js"
import { authUser } from "../middlewares/authMiddleware.js"
import { addNewCar, getAllAvailableCars, getOwnerCars, toggleCarAvailability} from "../controllers/carController.js"

const carRouter = express.Router()

carRouter.post('/', upload.array("images", 4), authUser, addNewCar)
carRouter.get('/', getAllAvailableCars)
carRouter.get('/owner', getOwnerCars)
carRouter.post('/toggle-availability', authUser, toggleCarAvailability)


export default carRouter