import React from 'react'
import MaintenanceAddProduct from './maintenance_sub/MaintenanceAddProduct'
import MaintenanceModifyProduct from './maintenance_sub/MaintenanceModifyProduct'

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