import React from 'react'
import Footer from './subcomponents/Footer'
import { arrayBufferToBase64 } from '../modules/arrayBufferToBase64'

function ProductDetail(props) {
    const prodState = props.location.state

    const mainBase64Flag = `data:${prodState.mainImg.contentType};base64,`
    const mainImageStr = arrayBufferToBase64(prodState.mainImg.data.data)
    const mainImg = <img src={mainBase64Flag + mainImageStr} />

    const accessoryImages = prodState.accImgs.map(element => {
        const base64FlagAcc = `data:${element.contentType};base64,`
        const imageStrAcc = arrayBufferToBase64(element.data.data)
        return (
            <img style={{width: 240}} src={base64FlagAcc + imageStrAcc} />
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