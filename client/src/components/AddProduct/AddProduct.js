import Jumbotron from '../Jumbotron';

const AddProduct = ({
    
}) => {
    return (
        <div className="container">
            <Jumbotron heading="Add product" content="example content. add later!!!"/>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        User information
                    </h4>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <h6 className="my-0">Mkazakov200420</h6>
                            <small className="text-muted">Username</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <h6 className="my-0">Mkazakov200420</h6>
                            <small className="text-muted">Username</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <h6 className="my-0">Mkazakov200420</h6>
                            <small className="text-muted">Username</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <h6 className="my-0">Mkazakov200420</h6>
                            <small className="text-muted">Username</small>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <h6 className="my-0">Mkazakov200420</h6>
                            <small className="text-muted">Username</small>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Product information</h4>
                    <form>
                        <div className="mb-3">
                            <label className="" htmlFor="productName">
                                asdasda&nbsp;&nbsp;
                                <span className="text-muted">Optional</span>
                            </label>
                            <input data-role="tagsinput" type="text" className="form-control" id="productName" placeholder="adsad" required/>
                            <span className="invalid-feedback"> Please enter your</span>
                        </div>
                        <div className="mb-3">
                            <label className="" htmlFor="productNames">adasdadad</label>
                            <input type="text" className="form-control" id="productNames" placeholder="adsad" required/>
                            <span className="invalid-feedback"> Please enter your</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productNamess">asdasdasd</label>
                            <input type="text" className="form-control" id="productNamess" placeholder="adsad" required/>
                            <span className="invalid-feedback"> Please enter your</span>
                        </div>
                        <div class="form-group mb-3">
                            <label for="exampleFormControlTextarea1">Example textarea</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productNamess"></label>
                            <input type="text" className="form-control" id="price" placeholder="adsad" required/>
                            <span className="invalid-feedback"> Please enter your</span>
                        </div>
                        <div className="d-block mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                                <label class="form-check-label" for="exampleRadios1">
                                    Default radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                                <label class="form-check-label" for="exampleRadios1">
                                    Default radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                                <label class="form-check-label" for="exampleRadios1">
                                    Default radio
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Example select</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                            <label class="form-check-label" for="exampleRadios1">
                                Default radio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                            <label class="form-check-label" for="exampleRadios1">
                                Default radio
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                            <label class="form-check-label" for="exampleRadios1">
                                Default radio
                            </label>
                        </div>
                        <hr className="mb-4"/>
                        <button type="button" className="btn btn-primary btn-lg btn-block">add product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;