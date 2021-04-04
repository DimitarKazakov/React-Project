

const ContactForm = ({
    heading,
    email,
    phone,
    address,
}) => {
    return (
<section class="mb-4">
<h2 class="h1-responsive font-weight-bold text-center text-primary my-4">{heading}</h2>
<div class="row">

    <div class="col-md-9 mb-md-0 mb-5">
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <label for="name" className="font-weight-bold">Your name</label>
                        <input type="text" id="name" name="name" class="form-control"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <label for="email" className="font-weight-bold">Your email</label>
                        <input type="text" id="email" name="email" class="form-control"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mt-3">
                    <div class="md-form mb-0">
                        <label for="subject" className="font-weight-bold">Subject</label>
                        <input type="text" id="subject" name="subject" class="form-control"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mt-3">
                    <div class="md-form">
                        <label for="message" className="font-weight-bold">Your message</label>
                        <textarea type="text" id="message" name="message" rows="6" class="form-control md-textarea"></textarea>   
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">Send Message</button>
        </form>
    </div>
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
</div>
</section>
    );
};

export default ContactForm;