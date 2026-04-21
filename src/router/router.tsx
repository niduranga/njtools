import {createBrowserRouter} from "react-router";
import RootLayout from "../components/layout/RootLayout.tsx";
import Home from "../pages/Home.tsx";
import {DynamicToolWrapper} from "../pages/DynamicToolWrapper.tsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.tsx";
import TermsOfService from "../pages/TermsOfService.tsx";
import ContactUs from "../pages/ContactUs.tsx";
import AboutUs from "../pages/AboutUs.tsx";
import AllTools from "../pages/AllTools.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index:true,
                element:<Home/>
            },
            {
                path: "tools/:toolId",
                element: <DynamicToolWrapper />,
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path: "terms-of-service",
                element: <TermsOfService />,
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
            {
                path: "about",
                element: <AboutUs />,
            },
            {
                path: "tools",
                element: <AllTools />,
            },
        ]
    }
])