import { Router } from "express";
import flightsRoute from "./flight";
import destinationsRoute from "./destination";
import bookingsRoute from "./booking";

const router: Router = Router();

router.use("/flights", flightsRoute);
router.use("/destinations", destinationsRoute);
router.use("/bookings", bookingsRoute);

export default router;