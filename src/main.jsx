import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router.jsx'
import Authprovider from './Authprovider/Authprovider.jsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <RouterProvider router={Router}></RouterProvider>
      </Authprovider>
    </QueryClientProvider>
  </StrictMode >,
)
