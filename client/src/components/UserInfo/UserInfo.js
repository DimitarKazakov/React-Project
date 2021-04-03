import UserInfoItem from './UserInfoItem';

const UserInfo = ({
    username,
    email,
    realName,
    phone,
    address,
}) => {
    return (
        <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                User information
            </h4>
            <ul className="list-group mb-3">
                <UserInfoItem name="Username" value={username}/>
                {realName && <UserInfoItem name="Real Name" value={realName}/>}
                <UserInfoItem name="Email" value={email}/>
                {phone && <UserInfoItem name="Phone" value={phone}/>}
                {address && <UserInfoItem name="Address" value={address}/>}
            </ul>
        </div>
    );
};

export default UserInfo;