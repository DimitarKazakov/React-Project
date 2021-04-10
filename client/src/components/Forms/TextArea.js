

const TextArea = ({
    labelName,
    optionalLabelName,
    rows,
    placeholder,
    errorMessage,
    margin,
    name,
    value
}) => {
    return (
        <div class={`form-group mb-${margin} mt-${margin}`}>
            <label className="font-weight-bold" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <textarea name={name} class="form-control" defaultValue={value} id={labelName} rows={rows} required/>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default TextArea;