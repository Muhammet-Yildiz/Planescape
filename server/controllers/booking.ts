
import Booking, { IBooking } from '../models/booking';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

 const getBookings = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await Booking.find();

    res.status(200).json({
        bookings
    });

});


const createBooking = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const { flightName, serviceType, route, scheduleDateTime, prefixICAO }   = req.body as IBooking;
    console.log(req.body)

    const newBooking = await Booking.create({
        flightName,
        serviceType,
        route,
        scheduleDateTime,
        prefixICAO
    })

    console.log('newBooking', newBooking)

    res.status(200).json({
        success: true,
        message: "Booking created successfully"
    })

})



export { createBooking,getBookings } 