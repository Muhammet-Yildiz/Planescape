import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Flight } from "../types/flight";
import { Destination } from "../types/destination";
import { Booking } from "../types/booking";

export function useGetFlights(from: string, to: string ,sortBy: string ,filterMode : boolean ,departureDate : string) {
    const { data, isPending, isError, refetch, isLoading } = useQuery({
        queryKey: ["flights", from, to ,sortBy],

        queryFn: async () => {
            const queryParams = new URLSearchParams({
                airline: from,
                route: to,
                sort: sortBy ,
                filterMode  : `${filterMode}` ,
                scheduleDate :  departureDate
            });

            return  fetcher(`flights?${queryParams.toString()}`)
        },
        enabled: !!from && !!to,
    })

    const memorizedVal = useMemo(
        () => ({
            flights: (data?.flights as Flight[]) || [],
            flightsPending: isPending,
            flightsLoading: isLoading,
            isError: isError,
            refetch
        }),
        [data?.flights, isError, isPending, refetch, isLoading]
    );


    return memorizedVal
}


export function useGetDestinations() {
    const queries = useQueries({
        queries: Array.from({ length: 8 }, (_, index) => ({
            queryKey: ['destinations', index + 1],
            queryFn: async () => {
                const page = index + 1;
                return fetcher(`destinations?page=${page}`)
            },
            staleTime: Infinity,
            cacheTime: Infinity, 
        }))
    });

    const isLoading = queries.some(query => query.isLoading)
    const isError = queries.some(query => query.isError)     

    const destinations = queries
        .map(query => query.data?.destinations || []) 
        .flat();  

    const memorizedVal = useMemo(
        () => ({
            destinations : (destinations as Destination[]) || [],
            destinationsLoading: isLoading,
            destinationsError: isError,
        }),
        [destinations, isError, isLoading]
    );

    return memorizedVal;
}



export function useGetBookings() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            return fetcher(`bookings`)
        },
    })
   
    const memorizedVal = useMemo(
        () => ({
            bookings : (data?.bookings as Booking[]) || [],
            bookingsLoading: isLoading,
            bookingsError: isError,
        }),
        [data?.bookings, isLoading, isError]
    );

    return memorizedVal;
}
