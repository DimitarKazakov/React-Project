import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

const Footer = ({

}) => {

  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(localStorage.getItem('user'));

    setInterval(() => {
        const currentUser = localStorage.getItem('user');
        if (currentUser !== user) {
            setUser(currentUser);
        }
    }, 500);
}, []);

  return (
    <footer className="bg-primary text-white mt-5">
      <div className="container text-center text-md-left pt-4 pt-md-5">
        <div className="row mt-1 mt-md-0 mb-4 mb-md-0">
          <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">
            <h5>About Junk Shop</h5>
            <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />
            <p className="foot-desc mb-0">
              Junk Shop is my final project for <a className="text-white" href="https://softuni.bg">Softuni Software University.</a> You can check the
              github repo in the About Link in navigation or click here: <a className="text-white" href="https://github.com/DimitarKazakov/React-Project">Github</a>
            </p>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">
            <h5>Useful links</h5>
            <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />
            <ul className="list-unstyled foot-desc">
              <li className="mb-2">
                <Link className="text-white" to="/">Home</Link>
              </li>
              {user && <li className="mb-2">
                <Link className="text-white" to={`/users/profile/${user}`}>My Profile</Link>
              </li>}
              <li className="mb-2">
                <Link className="text-white" to="/categories">Shop</Link>
              </li>
              <li className="mb-2">
                <Link className="text-white" to="/products/all">All Products</Link>
              </li>
              <li className="mb-2">
                <a className="text-white" href="https://github.com/DimitarKazakov/React-Project">About</a>
              </li>
              {!user && <li className="mb-2">
                <Link className="text-white" to="/login">Login</Link>
              </li>}
              {!user && <li className="mb-2">
                <Link className="text-white" to="/register">Register</Link>
              </li>}
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">
            <h5>Contacts</h5>
            <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />
            <ul className="fa-ul foot-desc ml-4">
              <li className="mb-2">
                <span className="fa-li">
                  <i className="far fa-map"></i>
                </span>
                Plovdiv, Bulgaria, Bogomil Street 69
              </li>
              <li className="mb-2">
                <span className="fa-li">
                  <i className="fas fa-phone-alt"></i>
                </span>
                +359 985 429 359
              </li>
              <li className="mb-2">
                <span className="fa-li">
                  <i className="far fa-envelope"></i>
                </span>
                mkazakov200420@gmail.com
              </li>
              <li>
                <span className="fa-li">
                  <i className="far fa-clock"></i>
                </span>
                Monday - Friday: 10-18
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;