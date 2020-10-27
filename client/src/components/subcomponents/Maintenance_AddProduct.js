import React, { useState } from 'react'

export default function Maintenance_AddProduct() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')

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
                    <label>Acc1 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc2 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc3 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc4 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc5 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc6 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc7 Photo</label>
                    <input 
                        type='file' 
                        name='acc'
                    />
                    <br />
                    <label>Acc8 Photo</label>
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