import React, { useEffect, useState } from 'react'
import Footer from './universal_sub/Footer'
import { NavLink } from 'react-router-dom'
import { arrayBufferToBase64 } from '../modules/arrayBufferToBase64'

const Products = () => {

    const [data, setData] = useState([])

    
    useEffect(() => {
        fetchData()
    }, [])


    async function fetchData() {
        try {
            const response = await fetch('/api/load', {mode: 'cors'})
            const responseFormatted = await response.json()
            setData(responseFormatted)
        } catch(err) {
            console.log(`Error occured: ${err}`)
        }
    }

    const prodNames = data.map((item) => {
        return (
            <span key={item.key}className='p-names'>{item.name}</span>
        )
    })

    const prodTiles = data.map((item) => {
        const imageStr = arrayBufferToBase64(item.mainImg)
        return (
            <NavLink 
                className="p-info"
                key={item._id} 
                to={{
                    pathname: `/products/${item._id}`,
                    state: item
                }}
            >
                <div className="img-container">
                    <img 
                        src={imageStr}
                        alt=""
                    />
                    <div>{item.name}</div>
                </div>
            </NavLink>
        )
    })

    return(
        <div>
            <h3 className='p-title'>Products</h3>
            <hr/>
            <section className='p-text-section'>
                {prodNames}
            </section>
            <div className='products'>
                {prodTiles}
            </div>
            <Footer />
        </div>
    )
}

export default Products