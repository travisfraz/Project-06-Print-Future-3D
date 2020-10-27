import React, { useState } from 'react'

export default function Maintenance_AddProduct() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [addAccPhoto, setAddAccPhoto] = useState([])

    function addAcc() {
        const ele = document.getElementById('acc-pics')
        const numEle = ele.getElementsByTagName('input').length
        if (numEle < 8) {
            //const label = document.createElement('label')
            //const input = <input type='file' name='acc' />
            const jsx = <div key={numEle}><label>Acc{numEle+1} Photo</label><input type='file' name='acc' /></div>
            setAddAccPhoto(prevState => prevState.concat(jsx))
        } else {
            alert('Can not add more than 8 accessory pictures.')
        }
    }

    return (
        <div className='left'>Add Product
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
                    <label>Main Photo</label>
                    <input 
                        type='file' 
                        name='main'
                        placeholder='Main'
                    />
                    <br />
                    <div id='acc-pics'>
                        <label>Acc1 Photo</label>
                        <input 
                            type='file' 
                            name='acc'
                        />
                        {addAccPhoto}
                    </div>
                    <br />
                    <button type='button' onClick={addAcc}>Add Another Accessory Picture?</button>
                    <br />
                    <button>Submit</button>
                </form>
            </div>
    )

}