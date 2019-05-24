import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
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
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden,
    title: state.modal.title
  }
}

export default connect(mapStateToProps, actions)(Modal);