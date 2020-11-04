import React from 'react'
import Footer from './universal_sub/Footer'
import { arrayBufferToBase64 } from '../modules/arrayBufferToBase64'

function ProductDetail(props) {
    const prodState = props.location.state

    const mainImageStr = arrayBufferToBase64(prodState.mainImg)
    const mainImg = <img src={mainImageStr} alt='' />

    const options = prodState.size.map(ele => {
        return(
            <div>
                <label>{ele.sizeName}: ${ele.price}</label>
            </div>
        )
    })

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
            <div className="p-info">
                <h3>Options</h3>
                {options}
            </div>
            <div className='pd-img-container'>
                {accessoryImages}
            </div>
            <a href='https://www.etsy.com/shop/PrintFuture3D'>How to buy</a>
            <Footer />



        </div>
        
        
    )
}

export default ProductDetail