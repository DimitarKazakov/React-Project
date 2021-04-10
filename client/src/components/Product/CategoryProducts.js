import Products from '../Products';
import Jumbotron from '../Jumbotron/Jumbotron';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const CategoryProducts= ({
    match,
    history
}) => {
    const [products, setProducts] = useState([]);
    const [header, setHeading] = useState('Products');

    const currentUser = localStorage.getItem('user');
    useEffect(() => {
        fetch(`http://localhost:5002/api/product/category/${match.params.category}/${match.params.user}/${currentUser}/${match.params.order}/${match.params.search}`)
        .then(res => res.json())
        .then(res => setProducts(res))
        .catch(err => console.log(err));

        if (match.params.category === 'user') {
            setHeading(`${match.params.user} Products`);
        }
        else if (match.params.category === 'liked') {
            setHeading(`${match.params.user} Liked Products`);
        }
        else if (match.params.category === 'wished') {
            setHeading(`${match.params.user} Wish Listed Products`);
        }
        else if (match.params.category === 'all') {
            setHeading('All Products');
        }
        else{
            setHeading(`${match.params.category} Products`);
        }

    }, [match.params.category, match.params.order, match.params.search, match.params.user]);

    return(
        <div className="container-fluid mt-5 flex-container row">
            <Jumbotron 
                heading={header}
                content='Choose from our categories. There is a wide range of various items and services that can be of your help.'
                match={match}
                search={true}
            />
            {products && <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Order Products
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={`/categories/${match.params.category}/${match.params.user}/oldest/${match.params.search}`}>Oldest</Link>
                    <Link className="dropdown-item" to={`/categories/${match.params.category}/${match.params.user}/newest/${match.params.search}`}>Newest</Link>
                    <Link className="dropdown-item" to={`/categories/${match.params.category}/${match.params.user}/likes/${match.params.search}`}>Most Likes</Link>
                    <Link className="dropdown-item" to={`/categories/${match.params.category}/${match.params.user}/dislikes/${match.params.search}`}>Least Likes</Link>
                </div>
            </div>}
            <Products
                products={products}
                match={match}
                history={history}
            />
        </div>
    );
};

export default CategoryProducts;