import { useMutation } from "@tanstack/react-query";
import { createFlightBooking } from "./api";

export function useCreateFlightBooking( ) {
    return useMutation({
        mutationFn:  createFlightBooking,
    }) ;
}