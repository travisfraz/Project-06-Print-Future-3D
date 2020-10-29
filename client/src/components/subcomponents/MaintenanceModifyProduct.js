import React, { useState } from 'react'

export default function MaintenanceModifyProduct() {
    const [search, setSearch] = useState('')
    const [chooseModifyProd, setChooseModifyProd] = useState([])

    //Finds all products matching the search criteria.
    async function findProducts(e) {
        e.preventDefault()
        //Creates a url that will have the query search parameters added.
        const url = new URL("http://localhost:5000/api/search")
        const params = { criteria: search}
        url.search = new URLSearchParams(params).toString()

        const response = await fetch(url)
        const resJSON = await response.json()

        const temp = popChooseProd(null, resJSON)
        setChooseModifyProd(temp)
    }

    //Populates the modify section with either, "No Products Found", list of products found for selection, or the
    //product selected/only product found to be modified.
    function popChooseProd(e, productData) {
        let compJSX = null
        if (e) {
            console.log('Will populate chosen product')
            return null
        } else if (productData.length > 1) {
            compJSX = productData.map(ele => {
                return (
                    <div key={ele._id} id={ele._id}>
                        <label>{ele.name}</label>
                        <button onClick={popChooseProd}>Modify</button>
                    </div>
                )
            })
            return compJSX
        } else if (productData.length < 1) {
            return <div>No products found</div>
        } else {
            console.log('Will populate only product found')
            console.log(productData)
            const sProdData = productData[0]
            return (
                <form>
                    <div>
                        <label>{sProdData.name}</label>
                        <input type='text' />
                    </div>
                    <div>
                        <label>{sProdData.desc}</label>
                        <input type='textarea' />
                    </div>
                    <div>
                        <label>{sProdData.price}</label>
                        <input type='text' />
                    </div>
                    <div>
                        <img src='' alt='' />
                        <input type='file' />
                    </div>
                </form>
            )













            return null
        }
    }



    function popModifyProd(e) {
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
            {chooseModifyProd}
        </div>
    )
}