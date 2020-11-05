import React from 'react'

function ProductsSection() {
    return (
        <div className="products">
            <div className="img-container">
                <img src={require("../../images/lithophane_frame.jpg")} alt='' />
                <div className="pic-text">Lithophanes</div>
            </div>
            <div className="img-container">
                <img src={require("../../images/page holder.jpg")} alt='' />
                <div className="pic-text">Everyday</div>
            </div>
            <div className="img-container">
                <img src={require("../../images/ppcooker_cover.jpg")} alt='' />
                <div className="pic-text">Kitchen</div>
            </div>
        </div>
    )
}

export default ProductsSection