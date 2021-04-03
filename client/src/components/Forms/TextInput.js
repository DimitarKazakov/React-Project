

const TextInput = ({
    labelName,
    optionalLabelName,
    placeholder,
    errorMessage,
}) => {
    return (
        <div className="mb-5 mt-5">
            <label className="" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <input data-role="tagsinput" type="text" className="form-control" id={labelName} placeholder={placeholder} required/>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default TextInput;