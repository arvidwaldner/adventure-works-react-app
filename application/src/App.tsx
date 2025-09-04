import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Departments from './departments/DepartmentsComponent'
import Navbar from './NavbarComponent'
import { ToastContainer, toast } from "react-toastify";

function App() {
  
  return (
    <>
      <Navbar />
      <ToastContainer />      
      <Departments />
    </>
  )
}

export default App
