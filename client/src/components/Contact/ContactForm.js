import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import ContactFormAside from '../Contact/ContactFormAside';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const ContactForm = ({
    heading,
    email,
    phone,
    address,
    user
}) => {

    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const user = e.target.username.value;
        const contactInfo = e.target.email.value;
        const subject = e.target.subject.value;
        const content = e.target.content.value;

        if (!user || user.length > 30) {
            setError('Please type your name, maximum 30 characters...');
            return;
        }

        if (!contactInfo || contactInfo.length > 20) {
            setError('Please type your contact link, maximum 20 characters...');
            return;
        }

        if (!subject || subject.length > 20) {
            setError('Please type short subject of the message, maximum 20 characters...');
            return;
        }

        if (!content || content.length > 500) {
            setError('Please type in the content area, maximum 500 characters...');
            return;
        }

        const body = {
            From: user,
            To: heading,
            Subject: subject,
            Content: content,
            ContactLink: contactInfo,
        };

        fetch('http://localhost:5002/api/user/message',{
            method: 'POST',
            body: JSON.stringify(body),
            headers : {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <section class="mb-4">
        <Link to={`/users/profile/${heading}`} class="h1-responsive font-weight-bold text-center text-primary my-4 h2">Contact {heading}</Link>
        <div class="row">
        {error && <h5 className="text-danger">{error}</h5>}
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