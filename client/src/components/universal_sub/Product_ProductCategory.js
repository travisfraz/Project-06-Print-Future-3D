import React from 'react'
import { NavLink } from 'react-router-dom'
import { arrayBufferToBase64 } from '../../modules/arrayBufferToBase64'

export default function Product_ProductCategory(props) {

    const data = props.data

    if (!data) {
        return <div>Loading</div>
    } else {
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

        return (
            <div>
                <section className='p-text-section'>
                    {prodNames}
                </section>
                <div className='all-products'>
                    {prodTiles}
                </div>
            </div>
        )
    }
}