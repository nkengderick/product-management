import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/Notfound/NotFound';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import Home from './components/Home/Home';


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
                    <Route path='/products'>
                        <div>
                            <Header />
                            <ProductList />
                           
                            <Footer />
                        </div>
                    </Route>
                    <Route path='/add-product'>
                        <div>
                            <Header />
                            <ProductForm />
                           
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
