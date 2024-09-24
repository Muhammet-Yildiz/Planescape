import { Router } from "express";

import  {getDestinations} from "../controllers/destination"

const router: Router = Router();

router.get("/",getDestinations)

export default router;
