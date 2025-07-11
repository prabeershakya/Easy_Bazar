import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <div className=' flex justify-around sticky top-0 left-0 w-full z-50 bg-white shadow '>
      
      <div className='mt-2'>
            <Link to="/" className=' flex text-2xl font-extrabold'>
                Prabeer0x1 
            </Link>
        </div>
        <div className='mt-2 pt-2'>
            <Link to="/Products" className='hover:underline font-semibold p-2 ml-2'>
            Products
            </Link>
        </div>
        <div className='mt-2 pt-2'>
            <Link to="/Register" className='hover:underline font-semibold p-2 ml-2'>
            Register
            </Link>
        </div>
        <div className='mt-2 pt-2'>
            <Link to="/Login" className='hover:underline font-semibold p-2 ml-2'>
            Login
            </Link>
        </div>
    </div>
  )
}

export default NavBar
