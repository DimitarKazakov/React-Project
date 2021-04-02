import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Products from './components/Products';
import AddProduct from './components/AddProduct';

import {Switch, Route} from 'react-router-dom';

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
              <Route path="/categories/:category" exact component={Products} />
              <Route path="/products/add" exact component={AddProduct}/>
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
