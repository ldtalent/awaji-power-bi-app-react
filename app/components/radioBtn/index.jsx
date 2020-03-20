import React from 'react';

import './index.scss';

const RadioBtn = ({text, id, value, changeHandler}) => {
    const handleChangeEvent = () => changeHandler(value)

    return (
        <span className="radioBtn">
            <label className="radioBtn_label" htmlFor={id}>{`${text} mode`}</label>
            <input className="radioBtn_input" name="select" id={id} onChange={handleChangeEvent} type="radio" value={value} />
        </span>
    );
}

export default RadioBtn;
