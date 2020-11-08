import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    
    const order = () => {
        const answer = window.confirm('You will be directed to Etsy to order.  Would you like to coninue?')
        if (answer) {
            window.location='https://www.etsy.com/shop/PrintFuture3D'
        }
    }
    
    return (
        <div>
            <header className="header1">
                <h1 id="web-title">Print Future 3D</h1>
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavLink to='/About' className="nav-link">About</NavLink>
                <NavLink to='/Products' className="nav-link">Products</NavLink>
                <a onClick={order} className='nav-link'>Order</a>
            </header>
            
        </div>
    )
}

export default Header