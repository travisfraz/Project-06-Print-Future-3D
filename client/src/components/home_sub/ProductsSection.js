import React, { useEffect, useState } from 'react'
import { arrayBufferToBase64 } from '../../modules/arrayBufferToBase64'

function ProductsSection() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await fetch('/api/home')
            const resJSON = await response.json()
            console.log(resJSON)
            setData(resJSON)
        } catch(err) {
            console.log(`Error! ${err}`)
        }
    }

    //Function determines if data has been fetched and if so populates the product category tile links.
    function PopProducts() {
        if (!data.length) {
            return <div>Loading</div>
        } else {
            const categories = []
            const categoryTiles = []
            data.forEach(ele => {
                if (!categories.includes(ele.category)) {
                    categories.push(ele.category)
                    const tileImgSource = arrayBufferToBase64(ele.mainImg)
                    let tile = <div key={ele._id} className='img-container'><img src={tileImgSource} alt=''/><div className='pic-text'>{ele.category}</div></div>
                    categoryTiles.push(tile)
                }
            })

            return <div>{categoryTiles}</div>
        }
    }

    return (
        <div className="products">
            <PopProducts />
        </div>
    )
}

export default ProductsSection