import {Link} from 'react-router-dom';
import {Fragment} from 'react';
import DeleteModal from './DeleteModal';

const ProfileImage = ({
    image,
    profileEmail,
    currentUserEmail,
    history
}) => {

    const deleteUser = () => {
        fetch(`http://localhost:5002/api/user/delete/${currentUserEmail}`,{
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            },
        });
        localStorage.removeItem('user');
        history.push('/');
    };

    return (
        <div className="col-md-4 order-1">
            <div className="profile-img">
                <img className="img-fluid" src={image} alt="profile" />
            </div>
            <div className="row">
                    <div class="profile-work"> 
                        <p>See User's: </p>
                        {profileEmail === currentUserEmail && <Fragment>
                            <Link className="text-primary" to='/users/messages'>Messages</Link><br/>
                        </Fragment>}
                        <Link className="text-primary" to={`/categories/user/${profileEmail}/newest/nosearch`}>Products</Link><br />
                        <Link className="text-primary" to={`/categories/liked/${profileEmail}/newest/nosearch`}>Liked Products</Link><br />
                        <Link className="text-primary" to={`/categories/wished/${profileEmail}/newest/nosearch`}>Wish Listed Products</Link><br/>
                        {profileEmail === currentUserEmail && <Fragment>
                            <button onClick={deleteUser} className="btn btn-primary">DELETE PROFILE</button><br/>
                        </Fragment>}
                        <hr />
                </div>
            </div>
        </div>
    );
};

export default ProfileImage;