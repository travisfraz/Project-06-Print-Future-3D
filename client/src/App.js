import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'


import './App.css';
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Header from './components/universal_sub/Header'
import Maintenance from './components/Maintenance'
import ProductCategory from './components/ProductCategory';
//import Navigation from './components/Navigation'
//import Body from './components/subcomponents/Body'
//import Products from './components/subcomponents/Products-section'
//import Footer from './components/Footer'

function App() {
  return (

    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route path='/'  component={Home} exact/>
            <Route path='/about' component={About}/>
            <Route path='/products' component={Products} exact/>
            <Route path='/products/:id' component={ProductDetail}/>
            <Route path='/productcategory/:category' component={ProductCategory}/>
            <Route path='/maintenance' component={Maintenance}/>
            <Route component={Error}/>
          </Switch>
      </div>
    </BrowserRouter>
    /*<div className="App">
      <Header />
      <Body />
      <Products />
      <Footer />
    </div>*/
  );
}

export default App;
