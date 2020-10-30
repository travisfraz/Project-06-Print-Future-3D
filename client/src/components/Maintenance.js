import React from 'react'
import MaintenanceAddProduct from './subcomponents/MaintenanceAddProduct'
import MaintenanceModifyProduct from './subcomponents/MaintenanceModifyProduct'

export default function Maintenance() {

    return (
        <div className='parent'>
            <h1>Maintenace Page</h1>
            <br />
            <MaintenanceAddProduct />
            <MaintenanceModifyProduct />
        </div>
        
    )
}