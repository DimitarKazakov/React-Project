import {useState} from 'react';

const TextInput = ({
    labelName,
    optionalLabelName,
    placeholder,
    errorMessage,
    margin,
    user,
    name,
    onBlur,
    value
}) => {
    return (
        <div className={`mb-${margin} mt-${margin}`}>
            <label className="font-weight-bold" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <input onBlur={onBlur} name={name} defaultValue={value} data-role="tagsinput" type="text" className="form-control" id={labelName} placeholder={placeholder}/>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default TextInput;