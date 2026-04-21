import {createBrowserRouter} from "react-router";
import RootLayout from "../components/layout/RootLayout.tsx";
import Home from "../pages/Home.tsx";
import {DynamicToolWrapper} from "../pages/DynamicToolWrapper.tsx";

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
        ]
    }
])