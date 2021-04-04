const Rating = ({
    likes
}) => {
    let stars = 1;

    if(likes > 5 && likes <= 10){
        stars = 2;
    }
    else if(likes > 10 && likes <= 15){
        stars = 3;
    }
    else if(likes > 15 && likes <= 20){
        stars = 4;
    }
    else if(likes > 20){
        stars = 5;
    }
    
    const startsElement = [];
    for(let i = 1; i <= stars; i++ ){
        startsElement.push(<i key={i} className="fa fa-star"></i>);
    }

    return (
        <div className="ratings mr-2">
          {startsElement}
        </div>
    );
};

export default Rating;