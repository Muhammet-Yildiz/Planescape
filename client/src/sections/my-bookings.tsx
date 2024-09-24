import { Box, CircularProgress, Grid2,  Typography } from "@mui/material"
import { FlightItem } from "../components/main-content/flight-item"
import { useGetBookings } from "../services/queries"
import { Booking } from "../types/booking"

export const MyBookings = () => {
    const { bookings, bookingsLoading, bookingsError } = useGetBookings()

    if (bookingsLoading) {
        return (
            <Box sx={{
                display: 'flex', justifyContent: 'center',

                width: { xs: '100%', lg: 'calc(100% - 250px)' },
                py: 20,
            }}>
                <CircularProgress size={26} />
            </Box>
        );
    }

    if (bookingsError) return <div> Failed to load bookings</div>

    return (
        <Box sx={{
            px: { xs: 1, sm: 2, md: 4, lg: 10 },
        }}>
            <Typography
                variant="h5"
                fontWeight="700"
                color="text.main"
                sx={{ mb: 3, border: '1px solid #f2f2f2 ', py: 1 }}
                textAlign={'center'}
                fontSize={20}
            >
                My Bookings
            </Typography>

            <Grid2 sx={{ mb: 2, }}
                display={'flex'}
                justifyContent="space-between"
                flexWrap={'wrap'}
                gap={1}
            >
                {
                    bookings?.map((booking: Booking, index: number) => (
                        <Grid2 key={index}
                            sx={{
                                width: { xs: '100%', md: '49%' },
                                '& .flight-item': {
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' }
                                }

                            }}
                        >
                            <FlightItem
                                flight={booking as any}
                            />

                        </Grid2>
                    ))
                }

            </Grid2>

        </Box>
    )
}