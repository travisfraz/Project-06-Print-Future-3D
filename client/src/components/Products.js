import React, { useEffect, useState } from 'react'
import Footer from './subcomponents/Footer'
import { NavLink } from 'react-router-dom'

const Products = () => {

    const [data, setData] = useState([])

    async function fetchData() {
        try {
            const response = await fetch('/api/load', {mode: 'cors'})
            const responseFormatted = await response.json()
            setData(responseFormatted)
        } catch(err) {
            console.log(`Error occured: ${err}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const prodNames = data.map((item) => {
        return (
            <span key={item.key}className='p-names'>{item.name}</span>
        )
    })

    const prodTiles = data.map((item) => {
        return (
            <NavLink 
                key={item.key} 
                to={{
                    pathname: `/products/${item.key}`,
                    state: item
                }}
            >
                <div className="img-container">
                    <img 
                        src={require(`../images/${item.img}.jpg`)}
                        alt=""
                    />
                    <div className="p-info">{item.name}</div>
                    <div className="p-info">${item.price}</div>
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