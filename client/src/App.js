import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Home from './components/MainPage/Home';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/Product/ProductDetails';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Profile from './components/Account/Profile';
import Messages from './components/Account/Messages';
import CategoryProducts from './components/Product/CategoryProducts';
import UpdateProduct from './components/AddProduct/UpdateProduct';
import UpdateProfil from './components/Account/UpdateProfil';
function App() {
  return (
    <div className="App">
      <Header/>
            <br/>
            <br/>
            <br/>
            <br/>
          <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/categories" exact component={Categories} />
                <Route path="/categories/:category/:user/:order/:search" component={CategoryProducts} />
                <Route path="/products/add" exact component={AddProduct}/>
                <Route path="/product/update/:id" exact component={UpdateProduct}/>
                <Route path="/products/details/:id" component={ProductDetails}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/users/profile/:email" component={Profile}/>
                <Route path="/users/messages" component={Messages}/>
                <Route path="/users/update/:email" component={UpdateProfil}/>
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
