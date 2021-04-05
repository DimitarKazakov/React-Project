import {useState, useEffect} from 'react';
import Rating from '../Products/Rating';
import UserInfo from '../UserInfo/UserInfo';
import ContactForm from '../Contact/ContactForm';

const ProductDetails = ({
    match
}) => {
    
    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const currentUser = localStorage.getItem('user');
    useEffect(() => {
        fetch(`http://localhost:5002/api/product/productById/${match.params.id}`)
        .then(res => res.json())
        .then(res => setProduct(res))
        .catch(err => console.log(err));

        fetch(`http://localhost:5002/api/user/product/${match.params.id}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));
    }, []);

    return(
        <section className="mb-5 container-fluid">

        <div className="row">
        <div className="col-md-6 mb-4 mb-md-3">
            <div className="row mx-1">
                <div className="col-12 mb-0 rounded">
                    <img src={product.image} alt="product"
                    className="img-fluid z-depth-1"/>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <h2 className="text-primary">{product.name}</h2>
            <h5 className="mb-2 text-muted text-uppercase small">{product.category}</h5>
            <p className="text-primary text-right">Added on: {product.createdOn}</p>
            <div className="d-flex flex-row">
                <Rating likes={product.likes}/>
                <span className="badge badge-primary">{product.likes} likes</span>
            </div>
            <hr/>
            <p className="text-left h5">Condition: <span className="text-primary">{product.condition}</span></p>
            <p className="text-left h4">Price: <span className="text-primary">{product.price === 0 ? 'Free' : `${product.price} lv.`}</span></p>
            <p className="text-left h6 text-success">{product.isFreeShipping ? 'Free shipping' : 'Shipping not included'}</p>
            <hr/>
            <p className="mt-5 mb-3 pt-1 h5">{product.description}</p>
            <hr/>
            {currentUser && <button type="button" className="btn btn-outline-primary mr-0 mr-md-5 mt-2 mb-3">Like product</button>}
            {currentUser && <button type="button" className="btn btn-outline-info mr-0 mr-md-5 mt-2 mb-3">Add to Wishlist</button>}
            <button type="button" className="btn btn-outline-danger mt-2 mb-3">Contact Seller</button>
        </div>
        </div>
        <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Seller Information
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <UserInfo 
                    username={user.username}
                    email={user.email}
                    realName={user.realName}
                    phone={user.phone}
                    address={`${user.address}, ${user.town}`}
                />
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Location
            </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                    <iframe class="embed-responsive-item" src={`https://maps.google.com/maps?q=${user.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        allowfullscreen></iframe>
                </div>
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Contact Seller
            </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <ContactForm
                    heading={`Contact ${user.username}`}
                    email={user.email}
                    phone={user.phone}
                    address={`${user.address}, ${user.town}`}
                />
            </div>
            </div>
        </div>
        </div>
        </section>
    );
};

export default ProductDetails;