import ProfileUserInfoRow from './ProfileUserInfoRow';

const ProfileUserInfo = ({
    username,
    email,
    name,
    phone,
    address,
    town,
    products,
    likes,
    createdOn
}) => {
  return (
        <div className="tab-content profile-tab" id="pills-tabContent">
          <div
            className="tab-pane fade show active mt-3 bg-white"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
          <ProfileUserInfoRow
              label="Username:"
              data={username}
          />
          <hr />
          <ProfileUserInfoRow
              label="Email:"
              data={email}
          />
          <hr />
          <ProfileUserInfoRow
              label="Name:"
              data={name}
          />
          <hr />
          <ProfileUserInfoRow
              label="Phone:"
              data={phone}
          />
          <hr />
          <ProfileUserInfoRow
              label="Address:"
              data={address}
          />
          <hr />
          <ProfileUserInfoRow
              label="Town:"
              data={town}
          />
          <hr />
          <ProfileUserInfoRow
              label="Total Products:"
              data={products}
          />
          <hr />
          <ProfileUserInfoRow
              label="Total Likes:"
              data={likes}
          />
          <hr />
          <ProfileUserInfoRow
              label="On the platform since:"
              data={createdOn}
          />
          <hr /> 
        </div>
    </div>
      
  );
};

export default ProfileUserInfo;