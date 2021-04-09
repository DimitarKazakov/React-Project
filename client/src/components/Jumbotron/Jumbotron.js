const Jumbotron = ({
    heading,
    content,
}) => {

    return (
        <section className="jumbotron text-center bg-white w-100">
            <div className="container">
                <h1 className="jumbotron-heading text-primary">{heading.toUpperCase()}</h1>
                <p className="lead text-muted">{content}</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search..."/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Jumbotron;