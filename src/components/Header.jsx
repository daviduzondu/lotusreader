import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaFeatherAlt } from 'react-icons/fa'
function Header() {
    return (
        <div className='bg-blue-900 py-2 text-white md:flex md:justify-between items-center w-screen z-10 px-3 fixed' >
            <div className='flex mr-1 justify-center'>
                <FaFeatherAlt className='inline text-2xl mr-1' /> Lotus Reader 
            </div>
            <ul className='md:justify-between nav-elements items-center flex-wrap text-xs flex hover:[&>.]:cursor-pointer [&>.active]:underline md:mt-0 mt-5 justify-center'>
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3' to="/">Home</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3 new ' to="/new">New</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3 best ' to="/best">Best</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3 trending ' to="/trending">Trending</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3 ask ' to="/ask">Ask</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full m-1 md:mr-3 show ' to="/show">Show</NavLink >
                <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='border p-2 rounded-full jobs md:mr-3 mr-3' to="/jobs">Jobs</NavLink >
            </ul>
        </div>
    )
}

let activeStyle = {
    textDecoration: "none",
    backgroundColor: "white",
    color:"rgb(30, 58, 138)"
  };

export default Header