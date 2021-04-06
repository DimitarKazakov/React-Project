

const TextInput = ({
    labelName,
    optionalLabelName,
    placeholder,
    errorMessage,
    margin,
    user,
    name
}) => {
    return (
        <div className={`mb-${margin} mt-${margin}`}>
            <label className="font-weight-bold" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <input name={name} data-role="tagsinput" type="text" value={user} className="form-control" id={labelName} placeholder={placeholder} required/>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default TextInput;