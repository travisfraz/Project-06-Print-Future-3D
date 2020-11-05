import React, { useState, useEffect } from 'react'
import Footer from './universal_sub/Footer'
import ProductDetailComp from './productdetail_sub/ProductDetailComp'

export default function ProductDetail() {

    let [prodState, setProdState] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlPathArray = window.location.pathname.split('/')
                const prodId = urlPathArray[urlPathArray.length-1]
                const url = new URL("http://localhost:5000/api/productdetail")
                const params = { _id: prodId }
                url.search = new URLSearchParams(params)
                const response = await fetch(url)
                const resJSON = await response.json()
                console.log(resJSON)
                setProdState(resJSON)
            } catch (err) {
                console.log(`Error! ${err}`)
            }
        }
        fetchData()
    }, [])

    return(
        <div>
            <ProductDetailComp prodState={prodState} />
            <Footer />
        </div>
    )
}