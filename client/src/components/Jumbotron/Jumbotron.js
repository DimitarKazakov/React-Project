import {Link} from 'react-router-dom';
import {useState} from 'react';

const Jumbotron = ({
    heading,
    content,
    search,
    match
}) => {
    const [searchVal, setSearchVal] = useState('');

    const writeSearch = (e) =>{
        
        setSearchVal(e.target.value ? e.target.value : 'nosearch');
    };

    return (
        <section className="jumbotron text-center bg-white w-100">
            <div className="container">
                <h1 className="jumbotron-heading text-primary">{heading.toUpperCase()}</h1>
                <p className="lead text-muted">{content}</p>
                {search && <div className="input-group mb-3">
                    <input onChange={writeSearch} type="text" className="form-control" placeholder="Search..."/>
                    <div className="input-group-append">
                        <Link to={`/categories/${match.params.category}/${match.params.user}/${match.params.order}/${searchVal}`} className="btn btn-outline-primary" type="button" id="button-addon2">Search</Link>
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default Jumbotron;