import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
const Header = ({
}) => {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState('');
    const [likedProductsCount, setLikedProductsCount] = useState(0);
    const [wishListedProductsCount, setWishListedProductsCount] = useState(0);

    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));

        setUser(localStorage.getItem('user'));
        if (user) {
            fetch(`http://localhost:5002/api/user/likedProducts/${user}`)
            .then(res => res.json())
            .then(res => setLikedProductsCount(res))
            .catch(err => console.log(err));

            fetch(`http://localhost:5002/api/user/wishProducts/${user}`)
            .then(res => res.json())
            .then(res => setWishListedProductsCount(res))
            .catch(err => console.log(err));
        }

        setInterval(() => {
            const currentUser = localStorage.getItem('user');
            if (currentUser !== user) {
                setUser(currentUser);
            }
        }, 500);
    }, []);

    const reloadCategories = (e) => {
        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));
    };

    const reloadLikedAndWishedProducts = (e) => {
        fetch(`http://localhost:5002/api/user/likedProducts/${user}`)
        .then(res => res.json())
        .then(res => setLikedProductsCount(res))
        .catch(err => console.log(err));

        fetch(`http://localhost:5002/api/user/wishProducts/${user}`)
        .then(res => res.json())
        .then(res => setWishListedProductsCount(res))
        .catch(err => console.log(err));
    };

    const logoutUser = () => {
        if (!user) {
            return;
        }

        localStorage.removeItem('user');
        setUser('');
        history.push('/');
    };

    let categoryList = categories.map((category) => 
            <Link 
            className="dropdown-item"
            key={category.id} 
            to={`/categories/${category.name}`}>
                {category.name} &nbsp;
                <span className="badge badge-pill badge-primary">{category.products.length}</span>
            </Link>
        );

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Link class="navbar-brand" to="/">
            <i class="fas fa-dumpster"></i> Junk Shop
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <a className="nav-link" href="https://github.com/DimitarKazakov/React-Project">About</a>
                    <Link className="nav-link" to="/categories">Shop</Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown" onClick={reloadCategories}>
                        {categoryList}
                    </NavDropdown>
                    {user && <NavDropdown title="User Tab" id="basic-nav-dropdown" onClick={reloadLikedAndWishedProducts}>
                        <Link className="dropdown-item" to={`/users/profile/${user}`}>My Profile</Link>
                        <Link className="dropdown-item" to='/users/messages'>My Messages</Link>
                        <Link className="dropdown-item" to="/users/likesProducts">
                            Liked Products &nbsp;
                            <span className="badge badge-pill badge-primary">{likedProductsCount}</span>
                        </Link>
                        <Link className="dropdown-item" to="/users/wishList">
                            Wish List &nbsp;
                            <span className="badge badge-pill badge-primary">{wishListedProductsCount}</span>
                        </Link>
                        <Link className="dropdown-item" to="/products/add">Add Product</Link>
                    </NavDropdown>}
                </Nav>
                {user && <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search for user..." aria-label="Search"/>
                    <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                </form>}
                {!user && <NavLink className="nav-link text-white" to="/login">Login</NavLink>}
                {!user && <NavLink className="nav-link text-white" to="/register">Register</NavLink>}
                {user && <button onClick={logoutUser}  className="nav-link btn btn-outline-primary text-white">Logout</button>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;