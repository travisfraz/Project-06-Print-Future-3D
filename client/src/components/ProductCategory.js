import React, { useEffect, useState } from 'react'
import Product_ProductCategory from './universal_sub/Product_ProductCategory'
import Footer from './universal_sub/Footer'

export default function ProductCategory() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const urlPathArray = window.location.pathname.split('/')
    const prodCategory = urlPathArray[urlPathArray.length-1]

    const fetchData = async () => {
        try {
            const url = new URL("http://localhost:5000/api/productcategory")
            const params = { category: prodCategory }
            url.search = new URLSearchParams(params)
            console.log(url)
            const response = await fetch(url)
            const resJSON = await response.json()
            console.log(resJSON)
            setData(resJSON)
        } catch (err) {
            console.log(`Error! ${err}`)
        }
    }

    return(
        <div>
            <h3 className='p-title'>{prodCategory}</h3>
            <hr/>
            <Product_ProductCategory data={data} />
            <Footer />
        </div>
    )
}