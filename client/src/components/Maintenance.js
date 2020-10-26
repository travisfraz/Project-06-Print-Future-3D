import React, { useState, useEffect } from 'react'

export default function Maintenance() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState(null)

    //const submitProduct = (event) => {
    //    event.preventDefault()
    //    const determiner = window.confirm(`Would you like to submit these changes?
    //    Product name: ${name}
    //    Product description: ${desc}
    //    Price: ${price}`)
//
    //    if (determiner) {
    //        const bodyData = {
    //            name: name,
    //            price: price,
    //            desc: desc
    //        }
//
//
    //    postNewImg(bodyData)
    //    }
    //}

    //async function postNewImg(bodyData) {
    //    const format = {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'multipart/form-data'
    //        },
    //        body: bodyData,
    //        files: {
    //            main: img
    //        }
    //    }
    //    try {
    //        const response = await fetch('/api/newimg', format)
    //        const responseJson = await response.json()
    //        console.log(responseJson)
    //    } catch (err) {
    //        console.log(err)
    //    }
    //}

    return (
        <div>Maintenance Page
            <form 
                method='Post'
                action='/api/newproduct'
                encType="multipart/form-data"
            >
                <input 
                    type="text"
                    name='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Product Name'
                />
                <br />
                <textarea
                    type='textarea'
                    name="desc"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder='Product Description'
                ></textarea>
                <br />
                <input
                    type="number"
                    name='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Price'
                />
                <br />
                <input 
                    type='file' 
                    name='main'
                    onChange={e => setImg(e.target.value)}
                />
                <br />
                <input 
                    type='file' 
                    name='acc'
                />
                <br />
                <input 
                    type='file' 
                    name='acc'
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}