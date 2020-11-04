import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header className="header1">
                <h1 id="web-title">Print Future 3D</h1>
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavLink to='/About' className="nav-link">About</NavLink>
                <NavLink to='/Products' className="nav-link">Products</NavLink>
            </header>
            
        </div>
    )
}

export default Header