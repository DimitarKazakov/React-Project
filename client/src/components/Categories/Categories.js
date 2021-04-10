import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Jumbotron from '../Jumbotron';

const Categories = ({
    
}) => {
  let [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));
    }, []);

    let categoriesCards = categories.map((category) => 
        <div 
            key={category.id}
            className="col-md-3 card card-width mt-5 border border-primary">
            <img className="card-img-top" src={category.image} alt="Card cap" />
            <div className="card-body">
                <Link to={`/categories/${category.name}/nouser/newest/nosearch`} className="card-text">
                    {category.name} &nbsp;
                    <span className="badge badge-pill badge-primary">{category.products.length}</span>
                </Link>
            </div>
        </div>
    );
  return (
    <div className="container-fluid mt-5 flex-container row">
        <Jumbotron 
            heading='Junk Shop Categories' 
            content='Choose from our categories. There is a wide range of various items and services that can be of your help.'
        />
        {categoriesCards}
    </div>
  );
};

export default Categories;
