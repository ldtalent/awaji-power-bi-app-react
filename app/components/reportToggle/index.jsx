import React from 'react';

import RadioBtn from '../radioBtn/index.jsx';

const ReportToggle = ({ radioBtnArray, radioBtnOnChange}) => {
    console.log(radioBtnArray);
    const radioBtns = radioBtnArray.map((item) => {
        return <RadioBtn
            text={item}
            value={item}
            key={item}
            changeHandler={radioBtnOnChange}
        />
    });

    return (
        <form>
            {radioBtns}
        </form>
    );
};

export default ReportToggle;
