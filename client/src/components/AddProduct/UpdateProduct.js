import Jumbotron from '../Jumbotron';
import UserInfo from '../UserInfo/UserInfo';
import {useState, useEffect} from 'react';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import CheckBox from '../Forms/CheckBox';
import Select from '../Forms/Select';
import {UpdateProduct} from '../../services/ProductService';

const AddProduct = ({
    history,
    match
}) => {
    const freeShipping = [
        'Free Shipping',
        'Shipping is covered by the buyer',
    ];

    const currentUser = localStorage.getItem('user');
    if(!currentUser){
        history.push('/login');
    }

    const [user, setUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [checkedCondition, setCheckedCondition] = useState(conditions[0]);
    const [checkedShipping, setCheckedShipping] = useState(freeShipping[0]);
    const [img, setImg] = useState('');
    const [error, setError] = useState('');
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5002/api/user/${currentUser}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));

        fetch('http://localhost:5002/api/category/all')
        .then(res => res.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err));

        fetch('http://localhost:5002/api/product/conditions')
        .then(res => res.json())
        .then(res => setConditions(res))
        .catch(err => console.log(err));

        fetch(`http://localhost:5002/api/product/productById/${match.params.id}/${currentUser}`)
        .then(res => res.json())
        .then(res => setProduct(res))
        .catch(err => console.log(err));
        
        setImg(product.image);
    }, []);

    const SubmitForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const keyWords = e.target.keys.value.split(' ');
        const description = e.target.description.value;
        const price = e.target.price.value;
        
        if (!name || name.length > 30) {
            setError('Name is required and it should be less than 30 symbols');
            return;
        }

        if (!keyWords || keyWords.length > 9) {
            setError('Key Words are required and no more than 9');
            return;
        }

        if (!image || (!image.startsWith('http://') && !image.startsWith('https://'))) {
            setError('Please write valid image url');
            return;
        }

        if (!description || description.length > 500) {
            setError('Description is required and it should be less than 500 symbols');
            return;
        }

        if (price === null || price === undefined || isNaN(Number.parseFloat(price))) {
          
            setError('Please write valid price for the product(if it\'s free write 0)');
            return;
        }

        UpdateProduct(user, e.target, checkedCondition, checkedShipping, match.params.id);
        history.push(`/products/details/${match.params.id}`);
    };

    const changeImg = (e) => {
        setImg(e.target.value);
    };

    return (
        <div className="container">
            <Jumbotron heading={`Update ${product.name}`}/>
            <div className="row">
                <UserInfo 
                    username={user.username}
                    email={user.email}
                    realName={user.realName}
                    phone={user.phone}
                    address={user.address ? `${user.address}, ${user.town}` : ''}
                />
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Product information</h4>
                    <hr/>
                    <img className="img-fluid" src={img} alt="Write image url to see how it looks like"/>
                    {error && <h5 className="text-danger">{error}</h5>}
                    <form onSubmit={SubmitForm}>
                        <TextInput
                            labelName="Name"
                            optionalLabelName="(The name of the product/service - max 30 symbols)"
                            placeholder="Type the name here..."
                            margin="5"
                            name="name"
                            value={product.name}
                        />
                        <hr/>
                        <TextInput
                            labelName="Image"
                            optionalLabelName="(Image url)"
                            placeholder="Paste image url here..."
                            errorMessage="Image is required"
                            margin="5"
                            name="image"
                            onBlur={changeImg}
                            value={product.image}
                        />
                        <hr/>
                        <TextInput
                            labelName="Key Words"
                            optionalLabelName="(Short description in words - max 9 words)"
                            placeholder="Type key words here..."
                            errorMessage="Max 6 keywords!!!"
                            margin="5"
                            name="keys"
                            value={product.productWords ? product.productWords.join(' ') : ''}
                        />
                        <hr/>
                        <TextArea
                            labelName="Description"
                            optionalLabelName="(Write good description of what you are offering)"
                            errorMessage="Description is required and it should be less than 1000 symbols"
                            rows="6"
                            margin="5"
                            name="description"
                            value={product.description}
                        />
                        <hr/>
                        <Select
                            labelName="Category"
                            optionalLabelName="(Chose one of the following categories)"
                            data={categories}
                            errorMessage="Choose category please"
                            select={product.category}
                        />
                        <hr/>
                        <CheckBox
                            labelName="Condition of the product/service"
                            options = {conditions}
                            errorMessage = "Check condition"
                            handler = {setCheckedCondition}
                            selected={product.condition}
                        />
                        <hr/>
                        <TextInput
                            labelName="Price"
                            optionalLabelName="(The price of the product)"
                            placeholder="Type the price here..."
                            errorMessage="The price is required"
                            margin="5"
                            name="price"
                            value={product.price}

                        />
                        <hr/>
                        <CheckBox
                            labelName="Shipping"
                            optionalLabelName="(Who covers the shipping)"
                            options = {freeShipping}
                            errorMessage = "Check shipping type"
                            handler = {setCheckedShipping}
                            selected={product.isFreeShipping ? freeShipping[0] : freeShipping[1]}
                        />
                        <hr className="mb-4"/>
                        {error && <h5 className="text-danger">{error}</h5>}
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;