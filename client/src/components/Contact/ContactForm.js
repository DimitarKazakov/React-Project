import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import ContactFormAside from '../Contact/ContactFormAside';

const ContactForm = ({
    heading,
    email,
    phone,
    address,
    user
}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        
        const body = {
            From: e.target.username.value,
            To: heading,
            Subject: e.target.subject.value,
            Content: e.target.content.value,
            ContactLink: e.target.email.value,
        };

        fetch('http://localhost:5002/api/user/message',{
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json',
            },
        });
        console.log(body);
    };

    return (
        <section class="mb-4">
        <h2 class="h1-responsive font-weight-bold text-center text-primary my-4">Contact {heading}</h2>
        <div class="row">

            <div class="col-md-9 mb-md-0 mb-5">
                <form onSubmit={onSubmit}>  
                    <div class="row">
                        <div class="col-md-6">
                            <TextInput
                                labelName="Your Name"
                                placeholder="Write your name here..."
                                errorMessage=""
                                margin="3"
                                user={user}
                                name="username"
                            />
                        </div>
                        <div class="col-md-6">
                            <TextInput
                                labelName="Your Email or Phone"
                                placeholder="Write Email or Phone number here..."
                                errorMessage=""
                                margin="3"
                                user={user}
                                name="email"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <TextInput
                                labelName="Subject"
                                placeholder="What are you contacting about..."
                                errorMessage=""
                                margin="3"
                                name="subject"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <TextArea
                                labelName="Your Message"
                                errorMessage=""
                                rows="6"
                                margin="3"
                                name="content"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block mt-4">Send Message</button>
                </form>
            </div>
            <ContactFormAside
                address={address}
                email={email}
                phone={phone}
            />
        </div>
        </section>
    );
};

export default ContactForm;