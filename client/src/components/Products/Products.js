import Product from '../Product';
import Jumbotron from '../Jumbotron/Jumbotron';
import {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Products = ({
  match,
  history,
  products
}) => {
  const currentUser = localStorage.getItem('user');

  let productsList = products.length === 0 ? 
    <h1 className="display-4 text-danger">
      Sorry there are still no items in this category, return later. <Link to="/categories">See other products.</Link>
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
        history={history}
        react={product.react}
      />
    );

  return (
    <Fragment>
      {productsList}
    </Fragment>
  );
};

export default Products;
