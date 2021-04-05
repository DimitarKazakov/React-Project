import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
const Header = ({
}) => {
    let [categories, setCategories] = useState([]);
    const [user, setUser] = useState('');
    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));

        setUser(localStorage.getItem('user'));

        setInterval(() => {
            const currentUser = localStorage.getItem('user');
            if (currentUser !== user) {
                setUser(currentUser);
            }
        }, 500);
    }, []);

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
            <Navbar.Brand href="/">Junk Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/categories">Shop</Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {categoryList}
                    </NavDropdown>
                    {user && <Link className="nav-link" to="/products/add">Add Product</Link>}
                </Nav>
                {!user && <NavLink className="nav-link text-white" to="/login">Login</NavLink>}
                {!user && <NavLink className="nav-link text-white" to="/register">Register</NavLink>}
                {user && <button onClick={logoutUser}  className="nav-link btn btn-outline-primary text-white">Logout</button>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;