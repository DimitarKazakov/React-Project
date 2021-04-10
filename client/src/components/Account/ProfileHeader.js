import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import ProfileUserInfo from './ProfileUserInfo';
const ProfileHeader = ({
    username,
    profileEmail,
    currentUserEmail,
    name,
    phone,
    address,
    town,
    products,
    likes,
    createdOn
}) => {
    return (
        <Fragment>
            <div className="col-md-6 order-md-2 order-3 mb-0">
                <div className="profile-head">
                    <h3 className="mb-4 text-primary">
                        {username}
                    </h3>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link className="nav-link active" id="home-tab" data-toggle="tab" to="#home" role="tab" aria-controls="home" aria-selected="true">About</Link>
                        </li>
                    </ul>
                    <ProfileUserInfo
                        username={username}
                        email={profileEmail}
                        name={name}
                        phone={phone}
                        address={address}
                        town={town}
                        products={products}
                        likes={likes}
                        createdOn={createdOn}
                    />
                </div>
            </div>
            {profileEmail === currentUserEmail && <div className="col-md-2 order-md-3 order-2 mt-3 mb-3 mt-md-0 mb-md-0">
                <Link className="btn btn-outline-primary border border-primary" to={`/users/update/${currentUserEmail}`}>Edit Profile</Link>
            </div>}
            {profileEmail !== currentUserEmail && <div className="col-md-2 order-md-3 order-2 mt-3 mb-3 mt-md-0 mb-md-0">
                <a className="btn btn-outline-primary border border-primary" href="#Contact">Write Message</a>
            </div>}
        </Fragment>
    );
};

export default ProfileHeader;