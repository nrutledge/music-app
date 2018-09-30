import React from 'react';

const Display = (props) => {
    return (
        <div 
            className="display" 
            style={{ 
                color: 'rgb(230, 230, 230)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
        >
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