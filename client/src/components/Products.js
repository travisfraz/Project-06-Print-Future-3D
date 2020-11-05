import React, { useEffect, useState } from 'react'
import Footer from './universal_sub/Footer'
import { NavLink } from 'react-router-dom'
import { arrayBufferToBase64 } from '../modules/arrayBufferToBase64'
import Product_ProductCategory from './universal_sub/Product_ProductCategory'

const Products = () => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await fetch('/api/products', {mode: 'cors'})
            const responseFormatted = await response.json()
            setData(responseFormatted)
        } catch(err) {
            console.log(`Error occured: ${err}`)
        }
    }

    return(
        <div>
            <h3 className='p-title'>Products</h3>
            <hr/>
            <Product_ProductCategory data={data} />
            <Footer />
        </div>
    )
}

export default Products