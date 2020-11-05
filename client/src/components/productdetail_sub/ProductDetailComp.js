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
            <div>
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
                </div>
                <div className='pd-img-container'>
                    {accessoryImages}
                </div>
            </div>
        )
    }
}


//useEffect(() => {
    //    const fetchData = async () => {
    //        try {
    //            const urlPathArray = window.location.pathname.split('/')
    //            const prodId = urlPathArray[urlPathArray.length-1]
    //            const url = new URL("http://localhost:5000/api/productdetail")
    //            const params = { _id: prodId }
    //            url.search = new URLSearchParams(params)
    //            const response = await fetch(url)
    //            const resJSON = await response.json()
    //            setProdState(resJSON)
    //        } catch (err) {
    //            console.log(`Error! ${err}`)
    //        }
    //    }
    //    fetchData()
    //}, [])
    //function fetchData() {
    //    const urlPathArray = window.location.pathname.split('/')
    //    const prodId = urlPathArray[urlPathArray.length-1]
    //    const url = new URL("http://localhost:5000/api/productdetail")
    //    const params = { _id: prodId }
    //    url.search = new URLSearchParams(params)
//
    //    fetch(url)
    //        .then(response => response.json())
    //        .then(resJSON => setProdState(resJSON[0]))
    //        .catch(err => console.log(`Error! ${err}`))
    //}