import Product from '../Product';
import Jumbotron from '../Jumbotron/Jumbotron';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Products = ({
  match
}) => {
  console.log(match);
  const [products, setProducts] = useState([]);

  const currentUser = localStorage.getItem('user');
  useEffect(() => {
    if (match.path.includes('/users/products/liked')) {
      console.log('liked');
      fetch(`http://localhost:5002/api/user/products/liked/${match.params.user}`)
      .then(res => res.json())
      .then(res => setProducts(res))
      .catch(err => console.log(err));

      return;
    }

    if (match.path.includes('/users/products/wished')) {
      console.log('liked');
      fetch(`http://localhost:5002/api/user/products/wished/${match.params.user}`)
      .then(res => res.json())
      .then(res => setProducts(res))
      .catch(err => console.log(err));

      return;
    }

    if (match.path.includes('/users/products')) {
      fetch(`http://localhost:5002/api/user/products/${match.params.user}`)
      .then(res => res.json())
      .then(res => setProducts(res))
      .catch(err => console.log(err));

      return;
    }

    if (match.params.category === 'users') {
      fetch(`http://localhost:5002/api/user/products/${currentUser}`)
      .then(res => res.json())
      .then(res => setProducts(res))
      .catch(err => console.log(err));

      return;
    }
    fetch(`http://localhost:5002/api/product/category/${match.params.category}`)
    .then(res => res.json())
    .then(res => setProducts(res))
    .catch(err => console.log(err));
  }, [match.params.category, match.path]);

  let productsList = products.length === 0 ? 
    <h1 className="display-4 text-danger">
      Sorry there are still no items in this category, return later. <Link to="/categories">See other categories.</Link>
    </h1>
    :
    products.map((product) => 
      <Product
        key={product.id}
        category={product.category}
        condition={product.condition}
        createdOn={product.createdOn}
        description={product.description}
        id={product.id}
        image={product.image}
        isFreeShipping={product.isFreeShipping}
        likes={product.likes}
        name={product.name}
        price={product.price}
        productWords={product.productWords}
        user={product.user}
        userEmail={product.email}
      />
    );

  return (
    <div className="container-fluid mt-5 flex-container row">
        <Jumbotron 
            heading={match.params.category || `${match.params.user} Products`}
            content='Choose from our categories. There is a wide range of various items and services that can be of your help.'
        />
        
        {productsList}
    </div>
  );
};

export default Products;
