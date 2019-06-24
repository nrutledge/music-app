import React, { Component } from 'react';
import './InputRange.css';

export default class InputRange extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setDisplayContent();
        }
    }

    setDisplayContent = () => {
        this.props.setDisplayContent(this.props.name + ': ' + this.props.value);
    }

    render() {
        return (
            <div className="input-range" onClick={event => event.stopPropagation()}>
                <label>
                    <div className="range-label">
                        {this.props.name}
                    </div>
                    <input 
                        className="range-slider"
                        type="range" 
                        name={this.props.name} 
                        min={this.props.min} 
                        max={this.props.max} 
                        value={this.props.value} 
                        onChange={this.props.handleInputRangeChange}
                        onMouseOver={this.setDisplayContent}
                    />
                </label>
            </div>
        )
    }
}