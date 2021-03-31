import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';

import {Container} from 'react-bootstrap';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
          <Switch>
              <Route path="/" exact component={Categories} />
              <Route path="/categories" exact component={Categories} />
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
