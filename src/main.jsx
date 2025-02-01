import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router.jsx'
import Authprovider from './Authprovider/Authprovider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={Router}></RouterProvider>
    </Authprovider>
  </StrictMode>,
)
