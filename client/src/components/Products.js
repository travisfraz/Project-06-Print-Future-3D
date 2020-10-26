import React, { useEffect, useState } from 'react'
import Footer from './subcomponents/Footer'
import { NavLink } from 'react-router-dom'

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


//function to format image binary data for viewing
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

//Do not delete!!! Need this in the short term to format binary data.
    //const images = msg.map(entry => {
    //    const base64Flag = `data:${entry.main.contentType};base64,`
    //    const imageStr = arrayBufferToBase64(entry.main.data.data)
//
    //    const accessoryImages = entry.accessory.map(element => {
    //        const base64FlagAcc = `data:${element.contentType};base64,`
    //        const imageStrAcc = arrayBufferToBase64(element.data.data)
    //        return (
    //            <img style={{width: 80}} src={base64FlagAcc + imageStrAcc} />
    //        )
    //    })
    //    return (
    //        <div>
    //            <img style={{width: 240}} src={base64Flag + imageStr} />
    //            {accessoryImages}
    //        </div>
    //        
    //    )
    //})

    const prodNames = data.map((item) => {
        return (
            <span key={item.key}className='p-names'>{item.name}</span>
        )
    })

    const prodTiles = data.map((item) => {

        const base64Flag = `data:${item.mainImg.contentType};base64,`
        const imageStr = arrayBufferToBase64(item.mainImg.data.data)

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
                        src={base64Flag + imageStr}
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