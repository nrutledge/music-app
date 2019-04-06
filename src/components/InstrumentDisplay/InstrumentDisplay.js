import React from 'react';

const Display = (props) => {
    return (
        <div className="display" style={{ 
          backgroundColor: `hsl(${props.hue}, 0%, 30%)`,
          borderTop: `2px solid hsl(${props.hue}, 65%, 70%)`,
          borderRight: `6px solid hsl(${props.hue}, 65%, 70%)`,
          borderLeft: `6px solid hsl(${props.hue}, 65%, 70%)`,
          borderBottom: `2px solid hsl(${props.hue}, 65%, 70%)`,
          // color: `hsl(${props.hue}, 70%, 80%)`
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