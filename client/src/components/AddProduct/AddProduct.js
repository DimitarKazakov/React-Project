import Jumbotron from '../Jumbotron';
import UserInfo from '../UserInfo/UserInfo';
import {useState, useEffect} from 'react';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import CheckBox from '../Forms/CheckBox';
import Select from '../Forms/Select';
import {CreateProduct} from '../../services/ProductService';

const AddProduct = ({
    history
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
    const [error, setError] = useState('');

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

        if (!price || !Number.parseFloat(price)) {
            setError('Please write valid price for the product(if it\'s free write 0)');
            return;
        }

        CreateProduct(user, e.target, checkedCondition, checkedShipping);
        history.push('/');
    };

    return (
        <div className="container">
            <Jumbotron heading="Add product" content="example content. add later!!!"/>
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
                    {error && <h5 className="text-danger">{error}</h5>}
                    <form onSubmit={SubmitForm}>
                        <TextInput
                            labelName="Name"
                            optionalLabelName="(The name of the product/service - max 30 symbols)"
                            placeholder="Type the name here..."
                            margin="5"
                            name="name"
                        />
                        <hr/>
                        <TextInput
                            labelName="Image"
                            optionalLabelName="(Image url)"
                            placeholder="Paste image url here..."
                            errorMessage="Image is required"
                            margin="5"
                            name="image"
                        />
                        <hr/>
                        <TextInput
                            labelName="Key Words"
                            optionalLabelName="(Short description in words - max 9 words)"
                            placeholder="Type key words here..."
                            errorMessage="Max 6 keywords!!!"
                            margin="5"
                            name="keys"
                        />
                        <hr/>
                        <TextArea
                            labelName="Description"
                            optionalLabelName="(Write good description of what you are offering)"
                            errorMessage="Description is required and it should be less than 1000 symbols"
                            rows="6"
                            margin="5"
                            name="description"
                        />
                        <hr/>
                        <Select
                            labelName="Category"
                            optionalLabelName="(Chose one of the following categories)"
                            data={categories}
                            errorMessage="Choose category please"
                        />
                        <hr/>
                        <CheckBox
                            labelName="Condition of the product/service"
                            options = {conditions}
                            errorMessage = "Check condition"
                            handler = {setCheckedCondition}
                        />
                        <hr/>
                        <TextInput
                            labelName="Price"
                            optionalLabelName="(The price of the product)"
                            placeholder="Type the price here..."
                            errorMessage="The price is required"
                            margin="5"
                            name="price"
                        />
                        <hr/>
                        <CheckBox
                            labelName="Shipping"
                            optionalLabelName="(Who covers the shipping)"
                            options = {freeShipping}
                            errorMessage = "Check shipping type"
                            handler = {setCheckedShipping}
                        />
                        <hr className="mb-4"/>
                        {error && <h5 className="text-danger">{error}</h5>}
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;