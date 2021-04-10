import Jumbotron from '../Jumbotron';
import UserInfo from '../UserInfo/UserInfo';
import {useState, useEffect} from 'react';
import TextInput from '../Forms/TextInput';
import {UpdateUser} from '../../services/ProductService';

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
    const [img, setImg] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5002/api/user/${currentUser}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));
        
        setImg(user.photo);
    }, []);

    const SubmitForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const town = e.target.town.value;
        
        if (name.length > 30) {
            setError('Name should be less than 30 symbols');
            return;
        }

        if (address.length > 30) {
            setError('Address should be less than 30 symbols');
            return;
        }

        if (town.length > 30) {
            setError('Town should be less than 30 symbols');
            return;
        }

        if (phone.length > 12) {
            setError('Phone must be no more than 12 symbols');
            return;
        }

        if (!image || (!image.startsWith('http://') && !image.startsWith('https://'))) {
            setError('Please write valid image url');
            return;
        }


        UpdateUser(user, e.target, currentUser);
        history.push(`/users/profile/${currentUser}`);
    };

    const changeImg = (e) => {
        setImg(e.target.value);
    };

    return (
        <div className="container">
            <Jumbotron heading={`Update ${currentUser}`}/>
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
                            optionalLabelName="(Your real name - max 30 symbols)"
                            placeholder="Type the name here..."
                            margin="5"
                            name="name"
                            value={user.realName}
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
                            value={user.photo}
                        />
                        <hr/>
                        <TextInput
                            labelName="Phone"
                            optionalLabelName=""
                            placeholder="Type phone number here..."
                            errorMessage="Max 12 symbols!!!"
                            margin="5"
                            name="phone"
                            value={user.phone}
                        />
                        <hr/>
                        <TextInput
                            labelName="Address"
                            optionalLabelName="(Your current location - 30 symbols max)"
                            placeholder="Type address  here..."
                            errorMessage="Max 30 symbols!!!"
                            margin="5"
                            name="address"
                            value={user.address}
                        />
                        <hr/>
                        <TextInput
                            labelName="Town"
                            optionalLabelName="(The town you live in - 30 symbols max)"
                            placeholder="Type town  here..."
                            errorMessage="Max 30 symbols!!!"
                            margin="5"
                            name="town"
                            value={user.town}
                        />
                        <hr/>
                        {error && <h5 className="text-danger">{error}</h5>}
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;