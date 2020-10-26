import React, { useState, useEffect } from 'react'

export default function Maintenance() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState(null)

    const submitProduct = (event) => {
        event.preventDefault()
        const determiner = window.confirm(`Would you like to submit these changes?
        Product name: ${name}
        Product description: ${desc}
        Price: ${price}`)

        if (determiner) {
            const productData = {
                name: name,
                price: price,
                desc: desc
            }
        //postNew(productData)    
        postNewImg()
        }
    }

    async function postNew(productData) {
        const format = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        }
        try {
            const response = await fetch('/api/new', format)
            const responseJson = await response.json()
            console.log(responseJson)
        } catch (err) {
            console.log(err)
        }
    }

    async function postNewImg() {
        const format = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: img
        }
        try {
            const response = await fetch('/api/newimg', format)
            const responseJson = await response.json()
            console.log(responseJson)
        } catch (err) {
            console.log(err)
        }
    }

    /*useEffect(() => {
        console.log(desc)
    }, [desc])*/

    return (
        <div>Maintenance Page
            <form onSubmit={submitProduct}
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Product Name'
                >
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
                    name='img'
                    onChange={e => setImg(e.target.value)}
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}