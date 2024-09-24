import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { createCustomTheme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

export default function App() {

  const theme = createCustomTheme({
    theme: "light",
  });


  return (
    <QueryClientProvider client={queryClient}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </LocalizationProvider>

    </QueryClientProvider>

  );
}

