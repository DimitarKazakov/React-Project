import AccordionItem from '../Products/AccordionItem';
import Jumbotron from '../Jumbotron/Jumbotron';
import {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const Messages = ({
    history
}) => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        history.push('/');  
    }

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5002/api/user/messages/${currentUser}`)
        .then(res => res.json())
        .then(res => setMessages(res))
        .catch(err => console.log(err));
    }, []);

    const acordionItems = messages.map((message) => 
        <AccordionItem
            key={message.id}
            id={message.id}
            header={`Subject: ${message.subject} _____ Sender: ${message.from}(${message.contactLink}) _____ Date: ${message.createdOn}`}
        >
            {message.content}
        </AccordionItem>
    );

    let content = messages.length === 0 ?
        <h1 className="display-4 text-danger">
            There are no messages, return later.
        </h1>
        :
        <div className="accordion" id="accordionExample">
            {acordionItems}
        </div>
        ;

    return (
        <Fragment>
            <Jumbotron
                heading={`${currentUser} Messages`}
                content="Here are all your messages, people that contacted you for a product or have question for you"
            />
            {content}
        </Fragment>
    );
};

export default Messages;

