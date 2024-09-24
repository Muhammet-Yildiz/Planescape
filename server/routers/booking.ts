import { Router } from "express";


import {createBooking,getBookings} from "../controllers/booking"

const router: Router = Router();

router.get("/",getBookings)
router.post("/create",createBooking)

export default router;
