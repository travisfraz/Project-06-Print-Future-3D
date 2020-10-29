import React from 'react'
import Footer from './subcomponents/Footer'
import { arrayBufferToBase64 } from '../modules/arrayBufferToBase64'

function ProductDetail(props) {
    const prodState = props.location.state

    const mainImageStr = arrayBufferToBase64(prodState.mainImg)
    const mainImg = <img src={mainImageStr} alt='' />

    const accessoryImages = prodState.accImgs.map(element => {
        const imageStrAcc = arrayBufferToBase64(element)
        return (
            <img style={{width: 240}} src={imageStrAcc} alt='' />
        )
    })

    return(
        <div>
            <h3 className='p-title'>{prodState.name}</h3>
            <hr/>
            <div className='pd-img-container'>
                {mainImg}
            </div>
            <article className='p-text-section'>
                {prodState.desc}
            </article>
            <br/>
            <div className="p-info">Price: ${prodState.price}</div>
            <div className='pd-img-container'>
                {accessoryImages}
            </div>
            <Footer />



        </div>
        
        
    )
}

export default ProductDetail