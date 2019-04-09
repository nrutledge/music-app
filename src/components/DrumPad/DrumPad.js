import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import handleKeyEvent from '../../util/handleKeyEvent';
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
    if ((this.props.playback !== undefined && this.props.playback !== prevProps.playback) || 
      this.props.isKeyDown !== prevProps.isKeyDown
    ) {
      if (this.props.playback === true || this.props.isKeyDown === true) {
        this.setState({ isPressed: true });
      } else if (this.props.playback === false || this.props.isKeyDown === false) {
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
      const bgColor = this.props.isActive ? this.state.isPressed ? '#414141' : '#373737' : '#323232';
      const lightness = this.props.isActive ? this.state.isPressed ? '88%' : '70%' : '30%';
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
              disabled={!this.props.isActive} 
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
  const { triggerKey: key, instrumentId } = ownProps;

  const playback = (
    recording[instrumentId] && 
    recording[instrumentId][playIndex] &&
    recording[instrumentId][playIndex][key]
  );
  const isKeyDown = playing[instrumentId] && playing[instrumentId][key];

  key === 'm' && console.log({ key, playback, isKeyDown })
  return { playback, isKeyDown };
}

export default connect(mapStateToProps, { keyPress })(DrumPad);

