import React, { useState } from 'react'

export default function MaintenanceModifyProduct() {
    const [search, setSearch] = useState('')
    const [chooseProducts, setChooseProducts] = useState([])

    async function findProducts(e) {
        e.preventDefault()
        //Creates a url that will have the query search parameters added.
        const url = new URL("http://localhost:5000/api/search")
        const params = { criteria: search}
        url.search = new URLSearchParams(params).toString()

        const response = await fetch(url)
        const resJSON = await response.json()
        const temp = resJSON.map(ele => {
            return (
                <div key={ele._id} id={ele._id}>
                    <label>{ele.name}</label>
                    <button name='joe' onClick={populateProduct}>Modify</button>
                </div>
                
            )
        })
        setChooseProducts(temp)
    }

    function populateProduct(e) {
        e.preventDefault()
        const selectedEle = e.target.parentElement
        console.log(selectedEle.id)
    }
    

    return (
        <div className='right'>Modify Product
            <form onSubmit={findProducts}>
                <input 
                    type='text'
                    name='search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button>Submit</button>
            </form>
            {chooseProducts}
        </div>
    )
}