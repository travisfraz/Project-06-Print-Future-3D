import React from 'react'
import MaintenanceAddProduct from './subcomponents/MaintenanceAddProduct'

export default function Maintenance() {

    

    return (
        <div className='parent'>
            <h1>Maintenace Page</h1>
            <br />
            <MaintenanceAddProduct />
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