import React from 'react';

const Display = (props) => {
    return (
        <div className="display" style={{ 
          border: props.armed && `2px solid hsl(${props.hue}, 65%, 70%)`,
          borderRadius: '8px',
          backgroundColor: props.armed ? 'rgba(65, 65, 65, 1)' : 'rgba(55, 55, 55, 1)'
        }}>
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