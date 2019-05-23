import React from 'react';
import { connect } from 'react-redux';
import './Modal.css';

const Modal = props => {
  return (
    <div className={'modal ' + (props.hidden && 'hidden')}>
      <h1>{props.title}</h1>
        <div className="modal__content">
          {props.content}
        </div>
      <button onClick={props.submitButtonHandler}>
        {props.submitButtonName || 'Submit'}
      </button>
      <button>Close</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden
  }
}

export default connect(mapStateToProps)(Modal);