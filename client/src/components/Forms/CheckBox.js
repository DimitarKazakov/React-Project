import {useState} from 'react';

const CheckBox = ({
    labelName,
    optionalLabelName,
    options,
    errorMessage,
    handler,
}) => {
    const [checked, setChecked] = useState(options[0]);

    const onChange = (e) => {
        setChecked(e.target.value);
        handler(e.target.value);
    };

    const checkBoxes = options.map((option) =>
        <div class="form-check" key={option}>
            <input class="form-check-input" type="radio" name="" id={option} value={option} onChange={onChange} checked={checked === option} required/>
            <label class="form-check-label" for={option}>
                {option}
            </label>
        </div>
    );

    return (
        <div className="d-block mb-3">
            <label className="font-weight-bold" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            {checkBoxes}
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default CheckBox;