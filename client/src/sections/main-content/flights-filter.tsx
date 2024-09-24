import { Box, FormControl, FormControlLabel, MenuItem, NativeSelect, Radio, RadioGroup, Select, Typography } from "@mui/material"
import { useGetFlights } from "../../services/queries";
import React from "react";
import { FlightsController } from "../../types/flight";


interface FlightsFilterProps {
   controller: FlightsController;
   setController: React.Dispatch<React.SetStateAction<FlightsFilterProps['controller']>>;
}
export const FlightsFilter: React.FC<FlightsFilterProps> = ({ controller, setController }) => {
   const { refetch } = useGetFlights(
      controller.from,
      controller.to,
      controller.sortBy,
      controller.filterMode,
      controller.departureDate
   );
   return (
      <Box
         sx={{
            width: { xs: '100%', lg: '320px' },
            minHeight: { xs: 'auto', lg: '340px' },
            pl: { xs: 1, lg: 2 },
            borderLeft: { xs: 'none', lg: '1px solid #E7DFEF' },

            display: 'flex',
            flexDirection: { xs: 'row', lg: 'column' },
            '& .MuiBox-root ': {
               width: { xs: '50%', lg: '100%' },
            },
            gap: { xs: 8, lg: 0 },

         }}
      >
         <Box >
            <Typography
               variant="body2"
               fontWeight={600}
               color="text.primary"
               fontSize={13}
            >
               Sort by :
            </Typography>
            <FormControl fullWidth
               sx={{
                  mt: 1.8, mb: 2.8,
                  '& *': {
                     border: 'none',
                  },
               }}
            >

               <Select
                  value={controller.sortBy}
                  label="Age"
                  onChange={(e) => setController({ ...controller, sortBy: e.target.value as FlightsController['sortBy'] })}
                  size="small"
                  sx={{
                     bgcolor: 'white',
                     fontSize: '14px',
                  }}
                  MenuProps={{
                     PaperProps: {
                        sx: {
                           '& .MuiMenuItem-root': {
                              fontSize: '14px',
                           },
                        },
                     },
                  }}
               >
                  <MenuItem value={'+scheduleTime'}> Highest Schedule Time</MenuItem>
                  <MenuItem value={'-scheduleTime'}>Lowest Schedule Time</MenuItem>
                  <MenuItem value={'+flightName'}> Highest  Flight Name</MenuItem>
                  <MenuItem value={'-flightName'}> Lowest Flight Name</MenuItem>
               </Select>
            </FormControl>
         </Box>
         <Box>

            <Typography
               variant="body2"
               fontWeight={600}
               color="text.primary"
               fontSize={13}
            >
               Filter Options :
            </Typography>

            <FormControl>
               <RadioGroup
                  value={controller.filterMode.toString()}
                  name="radio-buttons-group"
                  sx={{
                     '& .MuiFormControlLabel-label': {
                        fontSize: { xs: '11px', sm: '13px' },
                     },
                     mt: 1.6
                  }}
                  onChange={async (e) => {
                     await setController({ ...controller, filterMode: e.target.value === 'true', from: 'empty', to: 'empty' });
                     await refetch();
                  }}
               >
                  <FormControlLabel value={true} control={<Radio size="small" />} label="Apply Filter (Filter by From and To)" />
                  <FormControlLabel value={false} control={<Radio size="small" />} label="All (Retrieve all data)" />
               </RadioGroup>
            </FormControl>
         </Box>

      </Box>
   )
}