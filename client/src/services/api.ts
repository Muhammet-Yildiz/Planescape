import { Flight } from "../types/flight"
import axiosInstance from "./fetcher"


export const createFlightBooking = async ( bookingData : Flight) => {
     
    return await axiosInstance.post('/bookings/create', bookingData)
};