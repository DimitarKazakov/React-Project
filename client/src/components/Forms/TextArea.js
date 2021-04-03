

const TextArea = ({
    labelName,
    optionalLabelName,
    rows,
    placeholder,
    errorMessage
}) => {
    return (
        <div class="form-group mb-3">
            <label className="" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <textarea value={placeholder} class="form-control" id={labelName} rows={rows} required/>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default TextArea;