import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/Product/ProductDetails';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import React from 'react';
import {Switch, Route} from 'react-router-dom';

const UserContext = React.createContext();

function App() {
  return (
    <div className="App">
      <Header/>
      <br/>
      <br/>
      <br/>
      <br/>
          <Switch>
              <Route path="/" exact component={Categories} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/categories/:category" component={Products} />
              <Route path="/products/add" exact component={AddProduct}/>
              <Route path="/products/details/:id" component={ProductDetails}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
          </Switch>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default App;
