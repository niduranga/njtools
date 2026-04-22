import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import {router} from "./router/router.tsx";
import {HelmetProvider} from "react-helmet-async";
import ReactGA from "react-ga4";

import {ThemeProvider} from "./context/ThemeContext.tsx";

ReactGA.initialize("G-TLZV7MK3JD");

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>,
)