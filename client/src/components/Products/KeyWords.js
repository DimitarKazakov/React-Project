

const KeyWords = ({
    keywords,
}) => {
    const length = keywords.length;
    const firstKeyWords = [];
    for(let i = 0; i < length - 1; i++){
        firstKeyWords.push(<span key={keywords[i]} >{keywords[i]}</span>);
        firstKeyWords.push(<span className="dot"></span>);
    }

    let lastKeyWord = (
            <span key={keywords[length - 1]}>
                {keywords[length - 1]}
                <span className="dot"></span>
              <br />
            </span>
    );
    return (
        <div className="mt-1 mb-1 spec-1">
            {firstKeyWords}
            {lastKeyWord}
         </div>
    );
};

export default KeyWords;