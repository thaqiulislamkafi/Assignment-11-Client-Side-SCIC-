import { createBrowserRouter } from "react-router";
import Home from "./Components/Home/Home";
import Body from "./Components/Home/Body";
import Marathons from "./Components/Marathons";
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import MyMarathons from "./Components/Dashboard/MyMarathons";
import PrivateRoute, { Loading } from "./Components/Provider/PrivateRoute";
import AddMarathon from "./Components/Dashboard/AddMarathon";
import EventDetails from "./EventDetails";
import MarathonRegistration from "./MarathonRegistration";
import MyApply from "./Components/Dashboard/MyApply";
import Error from "./Components/Error";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        // errorElement: <Error />,
        hydrateFallbackElement: <Loading />,
        children: [
            {
                index: true,
                element: <Body />,
                hydrateFallbackElement: <Loading />,
                loader: () => fetch('https://assignment-11-server-site-silk-one.vercel.app/events')
            },
            {
                path: 'marathons',
                element: <PrivateRoute><Marathons /></PrivateRoute>,
                hydrateFallbackElement: <Loading />,

            },
            {
                path: 'signin',
                element: <SignIn />,
                hydrateFallbackElement: <Loading />

            },
            {
                path: 'signup',
                element: <Signup />,
                hydrateFallbackElement: <Loading />,

            },
            {
                path: 'marathonRegistration/:marathon_id',
                element: <PrivateRoute><MarathonRegistration /></PrivateRoute>,
                hydrateFallbackElement: <Loading />,
                errorElement: <Error />
            },
            {
                path: 'eventdetails/:event_id',
                element: <PrivateRoute><EventDetails /></PrivateRoute>,
                // loader: ({ params }) => fetch(`https://assignment-11-server-site-silk-one.vercel.app/marathon/${params.event_id}`),
                errorElement: <Error />,
                hydrateFallbackElement: <Loading />,

            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                hydrateFallbackElement: <Loading />,

                children: [
                    {
                        // index: true,
                        path: 'myMarathons',
                        element: <MyMarathons />,
                        hydrateFallbackElement: <Loading />

                    },
                    {
                        path: 'addMarathon',
                        element: <AddMarathon />,
                        hydrateFallbackElement: <Loading />

                    },
                    {
                        path: 'myapply',
                        element: <MyApply />,
                        hydrateFallbackElement: <Loading />


                    }
                ]
            },

        ]

    },

    {
        path: '*',
        element: <Error />
    }
])

export default router;