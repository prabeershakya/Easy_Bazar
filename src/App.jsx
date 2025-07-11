import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Products from './pages/Products'
const App = () => {
  return (
    <div>
      <Router>
        <NavBar/>
      <Routes>
        
        <Route path='/' 
        element={<Home />}
        />

        <Route path='/Register' 
        element={<Register />}
        />

        <Route path='/Login' 
        element={<Login />}
        />

        <Route path='/Products' 
        element={<Products />}
        />
      </Routes>
      </Router>
    </div>
  )
}

export default App
