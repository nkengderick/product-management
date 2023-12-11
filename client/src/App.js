import './App.css';
import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/Notfound/NotFound';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import InventoryTracking from './components/Inventory/InventoryTracking';
import Report from './components/Reports/Report'

const App = () => {
  return (
    <Router>
    <div className='App'>
        <div className='content'>
                <Switch>
                    <Route exact path='/'>
                        <div>
                            <Header />
                            <Home />
                            
                            <Footer />
                        </div>
                    </Route>
                    <Route exact path='/products'>
                        <div>
                            <Header />
                            <ProductList />
                           
                            <Footer />
                        </div>
                    </Route>
                    <Route path='/products/:category'>
                        <div>
                            <Header />
                            <ProductList />
                           
                            <Footer />
                        </div>
                    </Route>
                    <Route exact path='/add-product'>
                        <div>
                            <Header />
                            <ProductForm />
                           
                            <Footer />
                        </div>
                    </Route>
                    <Route path='/add-product/:id'>
                        <div>
                            <Header />
                            <ProductForm />
                           
                            <Footer />
                        </div>
                    </Route>
                    <Route exact path='/categories'>
                        <div>
                            <Header />
                            <Categories />

                            <Footer />
                        </div>
                    </Route>
                    <Route exact path='/inventories'>
                        <div>
                            <Header />
                            <InventoryTracking />

                            <Footer />
                        </div>
                    </Route>
                    <Route exact path='/report'>
                        <div>
                            <Header />
                            <Report />

                            <Footer />
                        </div>
                    </Route>
                    <Route path='*'>
                        <NotFound />
                    </Route>
                </Switch> 
        </div>
    </div>
</Router>
  );
}

export default App;
