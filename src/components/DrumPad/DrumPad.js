import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { handleKeyEvent } from '../../services';
import { keyPress } from '../../actions';
import './DrumPad.css';

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
    }
  }

  componentDidUpdate(prevProps) {   
    if ((this.props.playback && this.props.playback !== prevProps.playback) || 
      this.props.isKeyDown !== prevProps.isKeyDown
    ) {
      if (this.props.playback === 'd' || this.props.isKeyDown) {
        this.setState({ isPressed: true });
      } else {
        this.setState({ isPressed: false });
      }
    } 
  }

  // handleMouseEnter = () => this.props.setDisplayContent(this.props.name);
  handleMouseDown = handleKeyEvent(this.props.keyPress, false, this.props.triggerKey);
  handleMouseUp = handleKeyEvent(this.props.keyPress, true, this.props.triggerKey);

  // If currently playing, stop when mouse leaves key
  handleMouseLeave = () => this.props.isKeyDown && 
    handleKeyEvent(this.props.keyPress, true, this.props.triggerKey)();

  render() {
      //const bgColor = this.state.isPressed ? `hsl(${this.props.hue}, 40%, 50%)` : 'rgb(60, 60, 60)';
      const bgColor = this.state.isPressed ? 'rgb(65, 65, 65)' : 'rgb(55, 55, 55)';
      const lightness = this.props.isActive ? this.state.isPressed ? '88%' : '70%' : '40%';
      const saturation = this.props.isActive ? '65%' : '0%';
      const shadowAlpha = this.props.isActive ? this.state.isPressed ? '0.6' : '0.2' : '0';

      return (
          <button 
              className="drum-pad" 
              id={this.props.type} 
              onMouseEnter={this.handleMouseEnter}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseLeave={this.handleMouseLeave}
              style={{ 
                  width: this.props.width + 'rem',
                  height: this.props.height + 'rem',
                  fontSize: this.props.fontSize + 'rem',
                  backgroundColor: bgColor,
                  border: `2px solid hsl(${this.props.hue}, ${saturation}, ${lightness})`,
                  boxShadow: `0px 0px 20px 3px hsla(${this.props.hue}, ${saturation}, 60%, ${shadowAlpha})`,
                  color: `hsl(${this.props.hue}, ${saturation}, ${lightness})`
              }}
          >
              {this.props.triggerKey.toUpperCase()}
          </button>
      );
  }
}

const mapStateToProps = (
  { record: { playing, recording }, controls: { playIndex } }, 
  ownProps
) => { 
    const key = ownProps.triggerKey;
    const playback = recording[playIndex] ? recording[playIndex][key] : undefined;
    const isKeyDown = playing[key];
    
    return { playback, isKeyDown };
}

export default connect(mapStateToProps, { keyPress })(DrumPad);

