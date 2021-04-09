import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ProfileImage from './ProfileImage';
import ProfileHeader from './ProfileHeader';
import ProfileUserInfo from './ProfileUserInfo';
import ContactForm from '../Contact/ContactForm';
import AccordionItem from '../Products/AccordionItem';

const Profile = ({
    match,
    history
}) => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        history.push('/');  
    }

    const [user, setUser] = useState('');
    useEffect(() => {
        fetch(`http://localhost:5002/api/user/${match.params.email}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));
    }, []);

    console.log(user);
    return (
        <div class="container emp-profile">
            <div className="row">
                <ProfileImage 
                    image={user.photo}
                    profileEmail={user.email} 
                    currentUserEmail={currentUser}
                    history={history}
                />
                <ProfileHeader 
                    username={user.username} 
                    profileEmail={user.email} 
                    currentUserEmail={currentUser}
                    name={user.realName}
                    phone={user.phone}
                    address={user.address}
                    town={user.town}
                    products={user.products}
                    likes={user.likes}
                    createdOn={user.createdOn}
                />
            </div>
            {currentUser !== user.email && <div class="accordion" id="accordionExample">
                <AccordionItem header="Contact Seller" id="Contact">
                    <ContactForm
                        heading={user.username}
                        email={user.email}
                        phone={user.phone ? user.phone : 'No phone number'}
                        address={user.address ? `${user.address}, ${user.town}` : 'No address'}
                        user = {currentUser}
                    />
                </AccordionItem>
            </div>}
        </div>
    );
};

export default Profile;