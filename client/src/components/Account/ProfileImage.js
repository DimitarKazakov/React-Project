import {Link} from 'react-router-dom';
import {Fragment} from 'react';
const ProfileImage = ({
    image,
    profileEmail,
    currentUserEmail
}) => {
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
                        <Link className="text-primary" to="/">Products</Link><br />
                        <Link className="text-primary" to="/">Liked Products</Link><br />
                        <Link className="text-primary" to="/">Wish Listed Products</Link>
                        <hr />
                </div>
            </div>
        </div>
    );
};

export default ProfileImage;