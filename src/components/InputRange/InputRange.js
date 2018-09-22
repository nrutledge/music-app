import React, { Component } from 'react';
import './InputRange.css';

export default class InputRange extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setDisplay();
        }
    }

    setDisplay = () => {
        this.props.setDisplay(this.props.name + ': ' + this.props.value);
    }

    render() {
        return (
            <div className="input-range">
                <label>
                    <div className="text">
                        {this.props.name}
                    </div>
                    <input 
                        className="slider"
                        type="range" 
                        name={this.props.name} 
                        min={this.props.min} 
                        max={this.props.max} 
                        value={this.props.value} 
                        onChange={this.props.handleInputRangeChange}
                        onMouseOver={this.setDisplay}
                    />
                </label>
            </div>
        )
    }
}