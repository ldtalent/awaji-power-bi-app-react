import React from 'react';
import PropTypes from 'prop-types';

import RadioBtn from '../radioBtn/index.jsx';

const ReportToggle = ({ radioBtnArray, radioBtnOnChange}) => {
    const radioBtns = radioBtnArray.map(({ name, active}) => {
        return <RadioBtn
            text={name}
            value={name}
            key={name}
            active={active}
            changeHandler={radioBtnOnChange}
        />
    });

    return (
        <form>
            {radioBtns}
        </form>
    );
};

ReportToggle.propTypes = {
    radioBtnArray: PropTypes.array.isRequired,
    radioBtnOnChange: PropTypes.func.isRequired
};

export default ReportToggle;
