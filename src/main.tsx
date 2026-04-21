import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import {router} from "./router/router.tsx";
import {HelmetProvider} from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HelmetProvider>
          <RouterProvider router={router}/>
      </HelmetProvider>
  </StrictMode>,
)
