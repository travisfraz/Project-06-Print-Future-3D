import React, { useState, useEffect } from 'react'
import Maintenance_AddProduct from './subcomponents/Maintenance_AddProduct'

export default function Maintenance() {

    

    return (
        <div className='parent'>
            <h1>Maintenace Page</h1>
            <br />
            <Maintenance_AddProduct />
            <div className='right'> Modify Product
                <form>
                    <input 
                        type='text'
                    />
                    <input 
                        type='submit'
                    />
                </form>
            </div>
        </div>
        
    )
}