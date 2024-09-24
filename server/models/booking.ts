import { Schema, model, Document } from "mongoose";

export interface IBooking extends Document {
    flightName: string;
    serviceType?: string | null;
    route: Object; 
    scheduleDateTime?: Date | null;
    prefixICAO?: string;
}

const BookingSchema = new Schema<IBooking>({
    flightName: { type: String, required: true },
    serviceType: { type: String, required: false },
    route: { type: Object, required: true },
    scheduleDateTime: { type: Date, required: false },
    prefixICAO: { type: String, required: false },
}, {
    timestamps: true,
});

const Booking = model<IBooking>("Booking", BookingSchema);

export default Booking;