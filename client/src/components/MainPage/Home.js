

const Home = () => {
    return (
        <div id="carouselExampleControls" class="carousel slide mt-0 mb-0" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" src="https://gplaytv.bg/wp-content/uploads/2017/04/1032451-david-oreilly-double-fine-launching-everything-game.jpg" alt="First slide"/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>You will find everything here</h5>
                    <p>if you dont, just contact us we have everything</p>
                </div>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://cdn.shopify.com/s/files/1/1692/9471/articles/sh_1400x.progressive.jpg?v=1503209360" alt="Second slide"/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>This is the Number One second hand shop</h5>
                    <p>You can even sell your stuff here</p>
                </div>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://lh3.googleusercontent.com/proxy/6DCh5BJ6iPbCeAUs-1WPRZifOC-icLldwoI6SP5X-aYhwsw_F-PhdCOOvLLqv6T8UC1UVrEbIYQsELPFLxDDSyjSikVl3DXxcsRmLIBxbdad-L8koGDRnpigONhi_rJxdyg" alt="Third slide"/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Our product come from all over the world</h5>
                    <p>Litteraly from everywhere...</p>
                </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Home;