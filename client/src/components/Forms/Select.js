import {useState} from 'react';

const Select =({
    labelName,
    optionalLabelName,
    data,
    errorMessage,
}) => {
    const [selected, setSelected] = useState(data[0]);

    const options = data.map((x) => 
        <option key={x.name} value={x.name}>
            {x.name}
        </option>
    );
    
    return (
        <div class="form-group">
            <label className="font-weight-bold" htmlFor={labelName}>
                {labelName}&nbsp;&nbsp;
                {optionalLabelName && <span className="text-muted">{optionalLabelName}</span>}
            </label>
            <select class="form-control" id={labelName} value={selected} onChange={(e)=> setSelected(e.target.value)} required>
                {options}
            </select>
            <span className="invalid-feedback">{errorMessage}</span>
        </div>
    );
};

export default Select;