import React, { Component } from 'react';
import DrumPad from '../DrumPad/DrumPad';

class PadBank extends Component {
    render() {
        const drumPads = this.props.keyMappings.map((keyMap, index) => {
            return <DrumPad 
                        key={keyMap.id}
                        audioCtx={this.props.audioCtx}
                        convolver={this.props.convolver}
                        panner={this.props.panner}
                        name={keyMap.name}
                        source={keyMap.source}
                        triggerKey={keyMap.triggerKey} 
                        sound={keyMap.sound} 
                        volume={keyMap.volume} 
                        pan={keyMap.pan}
                        detune={keyMap.detune}
                        stopDelay={this.props.stopDelay}
                        decayTime={this.props.decayTime}
                        transitionTime={this.props.transitionTime}
                        instrumentVolume={this.props.instrumentVolume}
                        instrumentPanning={this.props.instrumentPanning}
                        instrumentDetune={this.props.instrumentDetune}
                        exclusiveZone={keyMap.exclusiveZone}
                        hue={this.props.hue}
                        playSound={this.props.playSound}
                        incrementLoadedCount={this.props.incrementLoadedCount}
                        setDisplayContent={this.props.setDisplayContent}
                    />
        });

        return (
            <div className="pad-bank">
                {drumPads}
            </div> 
        );
    }
}

export default PadBank;