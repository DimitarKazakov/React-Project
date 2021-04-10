import Rating from '../Products/Rating';
import KeyWords from '../Products/KeyWords';
import {Link} from 'react-router-dom';
import ProductImage from '../Products/ProductImage';
import {Fragment} from 'react';
import { useState } from 'react';
const Product = ({
  category,
  condition,
  createdOn,
  id,
  image,
  isFreeShipping,
  likes,
  name,
  price,
  productWords,
  user,
  userEmail,
  history,
  react,
}) => {

  const currentUser = localStorage.getItem('user');
  const [canLike, setCanLike] = useState(!react || !react.liked);
  const [canWish, setCanWish] = useState(!react || !react.wishlisted);
  const [likesCount, setLikes] = useState(+likes);

  const body = {
    id: id,
    user: currentUser
  };
  const LikeProduct = (e) => {
    fetch('http://localhost:5002/api/product/like',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (canLike) {
      setLikes((state) => state + 1);
    }
    else{
      setLikes((state) => state - 1);
    }
    setCanLike(!canLike);
  };

  const WhishListProduct = (e) => {    
    fetch('http://localhost:5002/api/product/wish',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    setCanWish(!canWish);
  };

  const deleteProduct = (e) => {
    fetch(`http://localhost:5002/api/product/delete/${id}`,{
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json',
        },
    });

    history.push('/');
  };

  let buttons = userEmail === currentUser ?
  <Fragment>
    <Link
      className="btn btn-success btn-sm mt-2"
      to={`/product/update/${id}`}
    >Update</Link>
    <button
      className="btn btn-outline-info btn-sm mt-2"
      type="button"
      onClick={deleteProduct}
      >Delete</button>
  </Fragment>
  :
  <Fragment>
    <button
      className="btn btn-outline-danger btn-sm mt-2"
      type="button"
      onClick={LikeProduct}
    >{canLike ? 'Like' : 'Unlike'}</button>
    <button
      className="btn btn-outline-info btn-sm mt-2"
      type="button"
      onClick={WhishListProduct}
      >{canWish ? 'Add to wishlist' : 'Remove from wishlish'}</button>
    </Fragment>
  ;

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
              <ProductImage
                    image={image}
                    col={'md-3'}
                    mt={1}
                />
            <div className="col-md-6 mt-1">
              <h5 className="text-truncate">{name}</h5>
              <h6 className="text-primary">{createdOn}</h6>
              <h6 className="text-muted">{category}</h6>
              <div className="d-flex flex-row">
                <Rating likes={likes}/>
                <span className="badge badge-primary">{likesCount} likes</span>
              </div>
              <KeyWords keywords={productWords.slice(0, 3)}/>
              {productWords.length > 3 && <KeyWords keywords ={productWords.slice(2, 3)}/>}
              {productWords.length > 6 && <KeyWords keywords ={productWords.slice(5, 3)}/>}
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <Link className="text-primary h4" to={`/users/profile/${user}`}>{user}</Link>
              <h4 className="mr-1">{price === 0 ? 'Free' : `${price} lv.`}</h4>
              <h6 className="text-success">{isFreeShipping ? 'Free shipping' : 'Shipping not included'}</h6>
              <h6 className="text-primary">{condition}</h6>
              <div className="d-flex flex-column mt-4">
                <Link className="text-white btn btn-primary btn-sm" to={`/products/details/${id}`}>Details</Link>
                {currentUser && buttons}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;