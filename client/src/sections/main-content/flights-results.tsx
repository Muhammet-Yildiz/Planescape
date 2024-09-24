import { Box, Typography, CircularProgress, } from '@mui/material'
import { useGetFlights } from '../../services/queries';
import { IoMdSearch } from "react-icons/io";
import { FlightItem } from '../../components/main-content/flight-item';
import { Flight, FlightsController } from '../../types/flight';
interface FlightsResultsProps {
  controller: FlightsController;
}
export const FlightsResults: React.FC<FlightsResultsProps> = ({ controller }) => {

  const { flights, flightsLoading, isError, flightsPending } = useGetFlights(
    controller.from,
    controller.to,
    controller.sortBy,
    controller.filterMode,
    controller.departureDate
  );
 
  if (flightsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', 
        width:{ xs: '100%', lg: 'calc(100% - 250px)' },
        pt: 10 ,
        pb : { xs: 10, lg: 0 }
       }}>
        <CircularProgress size={26} />
      </Box>
    );
  }


  return (
    <Box
      sx={{
        width: { xs: '100%', lg: 'calc(100% - 250px)' },
      }}
    >
      {
        flightsPending && !flights.length && <div>
           {/* İNİTİAL DATA */}
          </div>
      }

      {
        isError && !flights.length && <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 12, bgcolor: 'white', alignItems: 'center', gap: 1,

         }}>
          <IoMdSearch size={20} color={'#4B019B'} />
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.secondary"
            fontSize={12.6}
          >
            No flight records found
          </Typography>
        </Box>
      }


      {
        flights?.map((flight : Flight) => (
          <FlightItem
            key={flight?.id}
            flight={flight}
          />
        ))
      }

    </Box>
  )
}