import Product from '../Product';
import Jumbotron from '../Jumbotron/Jumbotron';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Products = ({
  match
}) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/api/product/category/${match.params.category}`)
    .then(res => res.json())
    .then(res => setProducts(res))
    .catch(err => console.log(err));
  }, []);

  let productsList = products.length === 0 ? 
    <h1 className="display-4 text-danger">
      Sorry there are still no items in this category, return later. <Link to="/categories">See other categories.</Link>
    </h1>
    :
    products.map((product) => 
      <Product></Product>
    );

  return (
    <div className="container-fluid mt-5 flex-container row">
        <Jumbotron 
            heading={match.params.category}
            content='Choose from our categories. There is a wide range of various items and services that can be of your help.'
        />
        
        {productsList}
    </div>
  );
};

export default Products;
