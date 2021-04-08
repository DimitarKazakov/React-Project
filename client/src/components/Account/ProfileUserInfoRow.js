const ProfileUserInfoRow = ({
    label,
    data
}) => {
    return (
        <div className="row">
            <div className="col-md-6">
            <label>{label}</label>
          </div>
          <div className="col-md-6">
            <p>{data}</p>
          </div>
        </div>
    );
};

export default ProfileUserInfoRow;