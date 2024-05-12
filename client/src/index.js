import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Transact from './components/Transact'
import CheckBalance from './components/CheckBalance'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/withdrawal/:accountNumber" element={<Transact type="withdrawal" />} />
      <Route path="/deposit/:accountNumber" element={<Transact type="deposit" />} />
      <Route path="/check-balance/:accountNumber" element={<CheckBalance />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
