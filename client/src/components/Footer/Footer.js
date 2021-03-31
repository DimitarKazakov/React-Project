const Footer = ({}) => {
  return (
    <footer className="bg-primary text-white mt-5">
      <div className="container text-center text-md-left pt-4 pt-md-5">
        <div className="row mt-1 mt-md-0 mb-4 mb-md-0">
          <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">
            <h5>About me</h5>
            <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

            <p className="foot-desc mb-0">
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">
            <h5>Useful links</h5>
            <hr className="color-primary mb-4 mt-0 d-inline-block mx-auto w-60" />

            <ul className="list-unstyled foot-desc">
              <li className="mb-2">
                <a className="text-white" href="#!">Your Account</a>
              </li>
              <li className="mb-2">
                <a className="text-white" href="#!">Become an Affiliate</a>
              </li>
              <li className="mb-2">
                <a className="text-white" href="#!">Shipping Rates</a>
              </li>
              <li className="mb-2">
                <a className="text-white" href="#!">Help</a>
              </li>
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
