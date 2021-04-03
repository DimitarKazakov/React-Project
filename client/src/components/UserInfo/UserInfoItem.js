

const UserInfoItem = ({
    name,
    value
}) => {
    return (
        <li className="list-group-item d-flex justify-content-between lh-condensed">
            <h6 className="my-0">{value}</h6>
            <small className="text-muted">{name}</small>
        </li>
    );
};

export default UserInfoItem;