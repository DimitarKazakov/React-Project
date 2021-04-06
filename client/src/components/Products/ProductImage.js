


const ProductImage = ({
    image,
    col,
    mt
}) => {
    return (
        <div className={`col-${col} mt-${mt}`}>
            <img
                className="img-fluid img-responsive rounded"
                src={image}
                alt="Product"
            />
        </div>
    );
};

export default ProductImage;