import React from 'react'

import Body from './home_sub/Body'
import ProductsSection from './home_sub/ProductsSection'
import Footer from './universal_sub/Footer'
import Banner from './home_sub/Banner'

const Home = () => {
    return (
        <div id='page-container'>
            <Banner />
            <Body />
            <ProductsSection />
            <Footer />
        </div>
    )
}

export default Home