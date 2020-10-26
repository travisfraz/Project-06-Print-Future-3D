import React from 'react'
import Footer from './subcomponents/Footer'

function ProductDetail(props) {


    const prodState = props.location.state


    console.log(prodState.desc)

    return(
        <div>
            <h3 className='p-title'>{prodState.name}</h3>
            <hr/>
            <article className='p-text-section'>
                {prodState.desc}
            </article>
            <br/>
            <div className="p-info">Price: ${prodState.price}</div>
            <div className='pd-img-container'>
                <img src={require(`../images/${prodState.img}.jpg`)} alt=''/>
            </div>
            <Footer />



        </div>
        
        
    )
}

export default ProductDetail