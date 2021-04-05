import Rating from '../Products/Rating';
import KeyWords from '../Products/KeyWords';
import {Link} from 'react-router-dom';

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
}) => {

  const currentUser = localStorage.getItem('user');

  const LikeProduct = (e) => {
    console.log(e.target);
  };

  const WhishListProduct = (e) => {
    console.log(e.target);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="row p-2 bg-white border rounded">
            <div className="col-md-3 mt-1">
              <img
                className="img-fluid img-responsive rounded product-image"
                src={image}
                alt="Product"
              />
            </div>
            <div className="col-md-6 mt-1">
              <h5 className="text-truncate">{name}</h5>
              <h6 className="text-primary">{createdOn}</h6>
              <h6 className="text-muted">{category}</h6>
              <div className="d-flex flex-row">
                <Rating likes={likes}/>
                <span className="badge badge-primary">{likes} likes</span>
              </div>
              <KeyWords keywords={productWords.slice(0, 3)}/>
              {productWords.length > 3 && <KeyWords keywords ={productWords.slice(2, 3)}/>}
              {productWords.length > 6 && <KeyWords keywords ={productWords.slice(5, 3)}/>}
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <h4 className="text-primary">{user}</h4>
              <h4 className="mr-1">{price === 0 ? 'Free' : `${price} lv.`}</h4>
              <h6 className="text-success">{isFreeShipping ? 'Free shipping' : 'Shipping not included'}</h6>
              <h6 className="text-primary">{condition}</h6>
              <div className="d-flex flex-column mt-4">
                <Link className="text-white btn btn-primary btn-sm" to={`/products/details/${id}`}>Details</Link>
                {currentUser && <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  type="button"
                  onClick={LikeProduct}
                >
                  Like
                </button>}
                {currentUser && <button
                  className="btn btn-outline-info btn-sm mt-2"
                  type="button"
                  onClick={WhishListProduct}
                >
                  Add to wishlist
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;