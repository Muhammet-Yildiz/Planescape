import dayjs from "dayjs"
import { Stack } from "@mui/material"
import { useState } from "react"
import { FlightsSearch } from "../flights-search";
import { FlightsResults } from "../flights-results";
import { FlightsFilter } from "../flights-filter";
import { Categories } from "../categories";
import { FlightsController } from "../../../types/flight";

export const MainContent = () => {
  const [controller, setController] = useState({
    from: '',
    to: '',
    journeyType: 'One way',
    sortBy: '+scheduleTime',
    filterMode: true,
    departureDate: dayjs().format('YYYY-MM-DD')
  } as FlightsController)

  return (
    <Stack sx={{
      display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' },
      justifyContent: 'space-between',
      gap: { xs: 1, md: 6 }, mx: { sm: 2, md: 4, lg: 10 }
    }}>
      <Stack
        sx={{
          width: { xs: '100%', md: 'calc(100% - 280px)' },
          flexDirection: 'column',
          position: 'relative',
          height: 'auto',
        }}
      >
        <FlightsSearch
          controller={controller}
          setController={setController}
        />
        <Stack sx={{
          flexDirection: { xs: 'column-reverse', lg: 'row' },
          width: '100%', gap: { xs: 1.2, md: 3, lg: 6 }, mt: { xs: 2, lg: 4 },
        }}>
          <FlightsResults
            controller={controller}
          />
          <FlightsFilter
            controller={controller}
            setController={setController}
          />
        </Stack>

      </Stack>

      <Categories />

    </Stack>
  )
}