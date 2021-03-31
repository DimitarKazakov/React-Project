import {Row, Col, Container, ListGroup, ListGroupItem} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
const Categories = ({

}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('url')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));
    }, []);

    return (
        <h1></h1>
    );
};

export default Categories;