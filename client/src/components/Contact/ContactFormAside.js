

const ContactFormAside = ({
    address,
    phone,
    email
}) => {
    return (
        <div class="col-md-3 text-center">
        <ul class="list-unstyled mb-0">
            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                <p>{address}</p>
            </li>
            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                <p>{phone}</p>
            </li>
            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                <p>{email}</p>
            </li>
        </ul>
    </div>
    );
};

export default ContactFormAside;