import { Box, Button, Stack, Typography } from "@mui/material";
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia";
import { MdAirplanemodeActive } from "react-icons/md";
import { Flight } from "../../types/flight";
import { useCreateFlightBooking } from "../../services/mutations";
import toast from "react-hot-toast";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FlightItemProps {
    flight: Flight
}
interface BadgeItem {
    label: string;
    bgColor: string;
    textColor: string;
}

interface FlightItem {
    icon: JSX.Element;
    label: string;
    content: string;
    time?: string;
}
export function FlightItem({ flight }: FlightItemProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate } = useCreateFlightBooking()
    const badgeItems = [
        {
            label: flight.serviceType === 'J' ? 'Passenger Line' :
                flight.serviceType === 'C' ? 'Passenger Charter' :
                    flight.serviceType === 'F' ? 'Freight Line' :
                        flight.serviceType === 'H' ? 'Freight Charter' : 'Unknown',
            bgColor: 'rgba(75,1,155,0.1)',
            textColor: 'text.main'
        },
        {
            label: flight.route?.visa ? 'Visa Included' : 'Visa Not Included',
            bgColor: '#f4f4f4',
            textColor: 'text.main'
        },
        {
            label: new Date(flight?.scheduleDateTime || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            bgColor: 'rgba(75,1,155,0.04)',
            textColor: 'text.main'
        }
    ] as BadgeItem[]

    const items = [
        {
            icon: <LiaPlaneDepartureSolid size={20} color='#636363' />,
            label: 'Departure',
            content: `Airpot: ${flight.prefixICAO}`,
            time: 'No Time Available',
        },
        {
            icon: <MdAirplanemodeActive size={20} color='#4b019b' style={{ transform: 'rotate(90deg)' }} />,
            label: 'ww',
            content: flight.route && flight.route?.destinations && flight.route?.destinations?.length > 1 ? `${flight.route.destinations.length - 1} stopovers` : 'Direct',
        },
        {
            icon: <LiaPlaneArrivalSolid size={20} color='#636363' />,
            label: 'Arrival',
            content: `Airpot: ${flight.route?.destinations?.[flight.route.destinations.length - 1] || 'No Destination Available'}`,
            time: flight.scheduleDateTime
                ? new Date(flight.scheduleDateTime).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Europe/London',
                }).toUpperCase()
                : 'No Time Available',
        },
    ] as FlightItem[]

    return (
        <Box
            className = "flight-item"
            sx={{
                backgroundColor: 'background.default',
                minHeight: 40,
                position: 'relative',
                borderRadius: '10px',
                borderBottomLeftRadius: 0,
                width: '98%',
                mb: 7,
                mx: { xs: 1, sm: 0 }
            }}
        >
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="13px"
                    color="text.primary"
                    sx={{
                        px: { xs: 1.4, sm: 3 },
                        pt: { xs: 1.5, sm: 2.4 },
                    }}
                >
                    {flight.prefixICAO} -  {flight?.route?.destinations && flight?.route?.destinations[flight?.route?.destinations.length - 1]}
                </Typography>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="10.4px"
                    color="text.main"
                    marginBottom="4px"
                    letterSpacing={0.2}
                    sx={{
                        bgcolor: '#f4f4f4 ',
                        p: 1,
                        borderRadius: '2px',
                        display: 'inline',
                        mr: 1,
                        mt: 1
                    }}
                >
                    {
                        flight.flightName
                    }
                </Typography>

            </Stack>

            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    mt: 1.4,
                    px: { xs: 1.4, sm: 3 },
                    py: { xs: 0.8, sm: 1.8 },
                }}
            >
                {items.map((item, index) => (

                    <React.Fragment key={index}>
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {index === 1 ?
                                <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={0.8}>
                                    <Box
                                        sx={{ backgroundColor: '#f2f2f2', width: 75, height: 16, display: 'inline' }}
                                    />
                                    {item.icon}
                                    <Box
                                        sx={{ mb: 0.2 }}
                                    />
                                </Box>
                                :

                                <Box display={'flex'} alignItems={'center'} gap={0.8}>
                                    {item.icon}
                                    <Typography fontWeight="600" fontSize="11.1px" color="text.grey">
                                        {item.label}
                                    </Typography>
                                </Box>
                            }

                            {item.time && (
                                <Typography
                                    fontWeight="700"
                                    fontSize={index === 0 ? '10.8px' : '11.6px'}
                                    color="text.primary"
                                    sx={{ mt: 0.7, mb: 0.42 }}
                                >
                                    {item.time}
                                </Typography>
                            )}
                            <Typography fontWeight="500" fontSize="11.1px" color="text.primary">
                                {item.content}
                            </Typography>
                        </Box>
                        {(index === 0 || index === 1) && <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #e0dede', width: 75 }} />}
                    </React.Fragment>

                ))}
            </Stack>

            <Stack flexDirection="row" alignItems="flex-end"
                sx={{
                    px: { xs: 1, sm: 3 },
                    pt: { xs: 0.8, sm: 1.4 },
                    pb: 2
                }}
            >
                <Box display="flex" alignItems="center" gap={1.8}>
                    {badgeItems.map((badge, index) => (
                        <Typography
                            key={index}
                            variant="h6"
                            fontWeight="500"
                            fontSize={{ xs: '8.7px', sm: '10.4px' }}
                            color={badge.textColor}
                            marginBottom="4px"
                            letterSpacing={0.2}
                            sx={{
                                bgcolor: badge.bgColor,
                                p: 1,
                                borderRadius: '2px'
                            }}
                        >
                            {badge.label}
                        </Typography>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        width: { xs: '110px', sm: '135px' },
                        height: { xs: '45px', sm: '55px' },
                        borderRadius: '10px 0 10px 0 ',
                        position: 'absolute',
                        right: '0px',
                        bottom: '0px',
                    }}
                    onClick={() => {
                        location.pathname !== '/bookings' &&
                        mutate(flight, {
                            onSuccess: () => {
                                toast.success('Flight booked successfully');
                                navigate('/bookings');
                            },
                            onError: (error) => {
                                toast.error(`Booking failed: ${error.message}`);
                            },
                        });
                    }}
                >
                    Book Flight
                </Button>

            </Stack>


            <Button
                variant="text"
                size="small"
                sx={{
                    width: { xs: '115px', sm: '135px' },
                    height: '40px',
                    position: 'absolute',
                    left: '0px',
                    bottom: '-40px',
                    backgroundColor: '#E5E0EB',
                    textDecoration: 'underline',
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    fontSize: { xs: '9.5px', sm: '11px' },
                    '&:hover': {
                        backgroundColor: '#E5E0EB',
                        textDecoration: 'underline',
                    }
                }}
                onClick={() => { }}
            >
                Check the details
            </Button>

        </Box>
    )

}