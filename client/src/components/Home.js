import React from 'react'

import Body from './subcomponents/Body'
import ProductsSection from './subcomponents/ProductsSection'
import Footer from './subcomponents/Footer'
import Banner from './subcomponents/Banner'

const Home = () => {
    return (
        <div>
            <Banner />
            <Body />
            <ProductsSection />
            <Footer />
        </div>
    )
}

export default Home