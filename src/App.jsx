import React from 'react'
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import Layout from './Components/Layout'
import Home from './Components/Home'
import FlagsSite from './Components/FlagsSite'
import { useSelector } from "react-redux"


function App() {
  const { dark } = useSelector ((state) => state.cart)

  const router = createBrowserRouter(createRoutesFromElements(   
    <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<FlagsSite/>} />
    </Route>
  ))

  return (
    <div style={{
      backgroundColor: dark ? 'white' : '#202C36',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App