import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const RadioBtn = ({ text, value, changeHandler, active }) => {
    const handleChangeEvent = () => changeHandler(value)

    return (
        <span className="radioBtn">
            <label className="radioBtn_label">{`${text} mode`}</label>
            <input
                className="radioBtn_input"
                name="select"
                checked={active}
                onChange={handleChangeEvent}
                type="radio" value={value}
            />
        </span>
    );
};

RadioBtn.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    changeHandler: PropTypes.func.isRequired
};

export default RadioBtn;
