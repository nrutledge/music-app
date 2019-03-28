import React from 'react';

const Display = (props) => {
    return (
        <div className="display">
            <div className="display-title">
                {props.displayName}
            </div>
            <div className="display-content">
                {props.displayContent}
            </div>
        </div>
    )
};

export default Display;