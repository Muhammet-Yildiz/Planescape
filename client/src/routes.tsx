import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar } from "./components/navbar";
import { LoadingScreen } from "./components/loading-screen";


const Loadable = (Component: React.ComponentType): React.FC => (props) => (
    <Suspense fallback={<LoadingScreen />} >
      <Component {...props} />
    </Suspense>
);



const MainContent = Loadable(lazy(() => import("./sections/main-content/view").then(({ MainContent }) => ({ default: MainContent }))));
const MyBookings = Loadable(lazy(() => import("./sections/my-bookings").then(({ MyBookings }) => ({ default: MyBookings }))));


export const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <Box
                sx={{ backgroundColor: 'background.paper' ,minHeight:'100vh',overflowX:'hidden',}}
            >
                <Navbar />
                <Outlet />
            </Box>
        ),
        children: [
            {
                index: true,
                element: (
                    <MainContent />
                )
            },
            {
                children: [
                    {
                        path: "/bookings",
                        element: <MyBookings />
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: (
            ' <Login />'
        )
    },
    {
        path: '/register',
        element: (
            '<Register />'
        )
    },

]);
