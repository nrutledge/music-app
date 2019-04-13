import React from 'react';
import './instrumentDisplay.css';

const Display = (props) => {
    return (
        <div className="instrument-display" style={{ 
          borderTop: props.armed && `2px solid hsl(${props.hue}, 65%, 70%)`,
          backgroundColor: props.armed ? 'rgba(65, 65, 65, 1)' : 'rgba(55, 55, 55, 1)'
        }}>
            <div className="instrument-display__title">
                {props.displayName}
            </div>
            <div className="instrument-display__content">
                {props.displayContent}
            </div>
        </div>
    )
};

export default Display;