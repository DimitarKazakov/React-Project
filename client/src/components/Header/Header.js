import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';

const Header = ({

}) => {
    let [categories, setCategories] = useState([]);

     console.log(categories);
    useEffect(() => {
        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));
    }, []);

    let categoryList = categories.map((category) => 
            <NavDropdown.Item 
            key={category.id} 
            href={`/categories/${category.name}`}>
                {category.name} &nbsp;
                <span className="badge badge-pill badge-primary">{category.products.length}</span>
            </NavDropdown.Item>
        );

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="/">Junk Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/categories">Shop</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {categoryList}
                    </NavDropdown>
                    <Nav.Link href="/products/add">Add Product</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;