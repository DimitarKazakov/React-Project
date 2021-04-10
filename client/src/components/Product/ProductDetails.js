import {useState, useEffect} from 'react';
import Rating from '../Products/Rating';
import UserInfo from '../UserInfo/UserInfo';
import ContactForm from '../Contact/ContactForm';
import ProductImage from '../Products/ProductImage';
import AccordionItem from '../Products/AccordionItem';
import {Fragment} from 'react';
import {Link} from 'react-router-dom';

const ProductDetails = ({
    match,
    history
}) => {
    
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [canLike, setCanLike] = useState(true);
    const [canWish, setCanWish] = useState(true);
    const [likesCount, setLikes] = useState(0);

    const currentUser = localStorage.getItem('user');
    useEffect(() => {
        fetch(`http://localhost:5002/api/product/productById/${match.params.id}/${currentUser}`)
        .then(res => res.json())
        .then(res => setProduct(res))
        .catch(err => console.log(err));

        fetch(`http://localhost:5002/api/user/product/${match.params.id}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setLikes(product.likes);
        setCanLike(!product.react || !product.react.liked);
        setCanWish(!product.react || !product.react.wishlisted);
    }, [product]);

  const body = {
    id: product.id,
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
        fetch(`http://localhost:5002/api/product/delete/${product.id}`,{
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            },
        });

        history.push('/');
      };

    let buttons = user.email === currentUser ?
    <Fragment>
        <Link
        className="btn btn-success mr-0 mr-md-5 mt-2 mb-3"
        to={`/product/update/${product.id}`}
        >Update</Link>
        <button
        className="btn btn-outline-info mr-0 mr-md-5 mt-2 mb-3"
        type="button"
        onClick={deleteProduct}
        >Delete</button>
    </Fragment>
    :
    <Fragment>
        <button
        className="btn btn-outline-primary mr-0 mr-md-5 mt-2 mb-3"
        type="button"
        onClick={LikeProduct}
        >{canLike ? 'Like' : 'Unlike'}</button>
        <button
        className="btn btn-outline-info mr-0 mr-md-5 mt-2 mb-3"
        type="button"
        onClick={WhishListProduct}
        >{canWish ? 'Add to wishlist' : 'Remove from wishlish'}</button>
        </Fragment>
  ;

    return(
        <section className="mb-5 container-fluid">

        <div className="row">
        <div className="col-md-6 mb-4 mb-md-3">
            <div className="row mx-1">
                <ProductImage
                    image={product.image}
                    col={12}
                    mt={0}
                />
            </div>
        </div>
        <div className="col-md-6">
            <h2 className="text-primary">{product.name}</h2>
            <h5 className="mb-2 text-muted text-uppercase small">{product.category}</h5>
            <p className="text-primary text-right">Added on: {product.createdOn} <br/> By: {<Link to={`/users/profile/${product.user}`}>{product.user}</Link>}</p>
            <div className="d-flex flex-row">
                <Rating likes={product.likes}/>
                <span className="badge badge-primary">{likesCount} likes</span>
            </div>
            <hr/>
            <p className="text-left h5">Condition: <span className="text-primary">{product.condition}</span></p>
            <p className="text-left h4">Price: <span className="text-primary">{product.price === 0 ? 'Free' : `${product.price} lv.`}</span></p>
            <p className="text-left h6 text-success">{product.isFreeShipping ? 'Free shipping' : 'Shipping not included'}</p>
            <hr/>
            <p className="mt-5 mb-3 pt-1 h5">{product.description}</p>
            <hr/>
            {currentUser && buttons}
            <button type="button" className="btn btn-outline-danger mt-2 mb-3">Contact Seller</button>
        </div>
        </div>
        <div class="accordion" id="accordionExample">
            <AccordionItem header="Seller Information" id="Info">
                <UserInfo 
                        username={user.username}
                        email={user.email}
                        realName={user.realName}
                        phone={user.phone}
                        address={`${user.address}, ${user.town}`}
                    />
            </AccordionItem>
            <AccordionItem header="Location" id="Location">
                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                    <iframe 
                    className="embed-responsive-item" 
                    src={`https://maps.google.com/maps?q=${user.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    allowfullscreen
                    title="GoogleMap"
                    >
                    </iframe>
                </div>
            </AccordionItem>
            <AccordionItem header="Contact Seller" id="Contact">
                <ContactForm
                    heading={user.username}
                    email={user.email}
                    phone={user.phone ? user.phone : 'No phone number'}
                    address="No address"
                    user = {currentUser}
                />
            </AccordionItem>
        </div>
        </section>
    );
};

export default ProductDetails;