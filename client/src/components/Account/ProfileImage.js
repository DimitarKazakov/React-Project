import {Link} from 'react-router-dom';
import {Fragment} from 'react';

const ProfileImage = ({
    image,
    profileEmail,
    currentUserEmail,
    history
}) => {

    const deleteUser = () => {
        console.log('DELETED');
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
                        <Link className="text-primary" to={`/users/products/${profileEmail}`}>Products</Link><br />
                        <Link className="text-primary" to={`/users/products/wished/${profileEmail}`}>Liked Products</Link><br />
                        <Link className="text-primary" to={`/users/products/wished/${profileEmail}`}>Wish Listed Products</Link><br/>
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