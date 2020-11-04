import React, { useState } from 'react'
import { arrayBufferToBase64 } from '../../modules/arrayBufferToBase64'

export default function MaintenanceModifyProduct() {
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])

    //Finds all products matching the search criteria, and save the data
    async function findProducts(e) {
        e.preventDefault()
        //Creates a url that will have the query search parameters added.
        const url = new URL("http://localhost:5000/api/search")
        const params = { criteria: search}
        url.search = new URLSearchParams(params).toString()

        const response = await fetch(url)
        const resJSON = await response.json()

        setSearchData(resJSON)
    }

    //Functional component that populates the Modify Section. Is called on all re-renders. Data is passed to it
    //via props. Based on the size of the array passed determines what data should be shown.
    function ModifySection(props) {
        const productData = props.data
        if (productData.length === 0) {
            return <div>No products found</div>
        } else if (productData.length > 1) {
            return popChooseProd(productData)
        } else if (productData.length === 1) {
            return popModifyProd(productData)
        } else {
            return <div>Error!</div>
        }
    }

    //Populates a list of items to be chosen for modification or deletion
    function popChooseProd(productData) {
        const compJSX = productData.map(ele => {
            return (
                <div key={ele._id}>
                    <label>{ele.name}</label>
                    <button id={ele._id} onClick={(e) => selectProd(e)}>Modify</button>
                </div>
            )
        })
            return compJSX
    }

    //Selects the product desired for modification. First creates an array with just the selected product, and
    //then filters out other products and saves the data as searchData
    function selectProd(e) {
        const prodId = e.target.id
        const prodData = searchData.map(ele => {
            if (ele._id === prodId) {
                console.log(ele)
                return ele
            } else {
                return ''
            }
        })
        const newProdData = prodData.filter(ele => ele !== '')
        setSearchData(newProdData)
    }

    //Populates all the fields a product has so they can be reviewed and then modified
    const popModifyProd = (prodDataArray) => {
        const prodData = prodDataArray[0]
        const prodSizes = prodData.size.map((ele, index) => {
            return (
                <div key={index}>
                    <div>
                        <label>Size: {ele.sizeName}</label>
                        <input type='text' name='sizeName' id={index}></input>
                        <button onClick={updateProperty}>Update</button>
                    </div>
                    <div>
                        <label>Price: {ele.price}</label>
                        <input type='number' name='price' id={index} step='0.01'></input>
                        <button onClick={updateProperty}>Update</button>
                    </div>
                </div>
            )
        })
        const mainImgString = arrayBufferToBase64(prodData.mainImg)
        const accImages = prodData.accImgs.map((ele, index) => {
            let accImgString = arrayBufferToBase64(ele)
            return (
                <div key={index}>
                    <label>Accessory Image {index+1}: </label>
                    <img src={accImgString} alt='' />
                    <input
                        type='file'
                        name='acc'
                        id={index}
                    />
                    <button onClick={updateProperty}>Update</button>
                    <br />
                </div>
            )
        })

        return (
            <form key={prodData._id} id={prodData._id} encType='multipart/form-data' method='post'>
                <div>
                    <h3>Product Name</h3>
                    <label>{prodData.name}</label>
                    <input 
                        type='text' 
                        name='name'
                    />
                    <button onClick={updateProperty}>Update</button>
                </div>
                <div>
                    <h3>Product Description</h3>
                    <label>{prodData.desc}</label>
                    <input
                        type='textarea'
                        name='desc'
                    />
                    <button onClick={updateProperty}>Update</button>
                <div>
                    <h3>Product Category</h3>
                    <input
                        type='text'
                        name='category'
                    />
                    <button onClick={updateProperty}>Update</button>
                </div>
                </div>
                <h3>Product Sizes</h3>
                {prodSizes}
                <div>
                    <h3>Main Image</h3>
                    <img src={mainImgString} alt='' />
                    <input 
                        type='file'
                        name='main'
                        id='0'
                    />
                    <button onClick={updateProperty}>Update</button>
                </div>
                <h3>Accesory Images</h3>
                {accImages}
                <button onClick={(e) => deleteProd(e)}>Delete Product</button>
            </form>
        )
    }

    //Sends call to server to update the selected product property
    async function updateProperty(e) {
        e.preventDefault()
        const inputEle = e.target.closest('div').querySelector('input')
        const inputType = inputEle.type
        const docId = e.target.closest('form').id
        if (inputType === 'text' || inputType === 'number') {
            const propertyName = inputEle.name
            const propertyValue = inputEle.value
            const bodyObj = {
                _id: docId,
                updateKey: propertyName,
                updateValue: propertyValue,
                position: inputEle.id
            }

            const fetchInit = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyObj)
            }
            try {
                const response = await fetch('http://localhost:5000/api/update/product_text', fetchInit)
                const resJSON = await response.json()
                console.log(resJSON)
            } catch(err) {
                console.log(`Text update Error! ${err}`)
            }

        } else if (inputType === 'file') {
            const formData = new FormData()

            formData.append('_id', docId)
            formData.append('image', inputEle.files[0])
            formData.append('position', inputEle.id)
            formData.append('name', inputEle.name)
            const fetchInit = {
                method: 'PUT',
                body: formData
            }

            const response = await fetch('http://localhost:5000/api/update/image', fetchInit)
            const resJSON = await response.json()
            console.log(resJSON)
        }
    }

    //Sends call to server to delete the selected product
    async function deleteProd(e) {
        e.preventDefault()
        const formEle = e.target.closest('form')
        const prodId = formEle.id
        const fetchInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prodId: prodId})
        }
        try {
            const response = await fetch("http://localhost:5000/api/delete", fetchInit)
            const resJSON = await response.json()
            console.log(resJSON)
        } catch(err) {
            console.log(`Error! ${err}`)
        }
        setSearchData([])
    }

    return (
        <div className='right'>Modify Product
            <form onSubmit={(e) => findProducts(e)}>
                <input 
                    type='text'
                    name='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button>Submit</button>
            </form>
            <ModifySection data={searchData}/>
        </div>
    )
}