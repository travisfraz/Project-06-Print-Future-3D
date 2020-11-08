import React from 'react'
import { arrayBufferToBase64 } from '../../modules/arrayBufferToBase64'

export default function ProductDetailComp(props) {
    
    console.log(props.prodState[0], 'comp')

    let prodState = props.prodState[0]

    if (!props.prodState[0]) {
        return <div>Loading</div>
    } else {
        
        console.log(prodState, 'productState')
        const productName = prodState.name

        const productDescription = prodState.desc

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

        return (
            <div className="products-content">
                <h3 className='p-title'>{productName}</h3>
                <hr/>
                <div className='pd-img-container'>
                    {mainImg}
                </div>
                <article className='p-text-section'>
                    {productDescription}
                </article>
                <br/>
                <div className="p-info">
                    <h3>Options</h3>
                    {options}
                    <br/>
                    <a href='https://www.etsy.com/shop/PrintFuture3D' className='nav-link'>Order on Etsy</a>
                </div>
                <div className='pd-img-container'>
                    {accessoryImages}
                </div>
            </div>
        )
    }
}