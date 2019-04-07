import React from 'react';

const Display = (props) => {
    return (
        <div className="display" style={{ 
          borderTop: `4px solid hsl(${props.hue}, 65%, 70%)` 
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