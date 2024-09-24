import { Router } from "express";

import {getFlights} from "../controllers/flight";

const router: Router = Router();

router.get("/", getFlights);


export default router;