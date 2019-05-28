import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Modal.css';

const Modal = props => {
  return (
    <div className={'modal ' + (props.hidden && 'hidden')}>
      <h1>{props.title}</h1>
      <div className="modal__content">
        {props.render && props.render()}
      </div>
      <div className="modal__bottom-section">
        <button onClick={props.closeModal}>Close</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden,
    title: state.modal.title,
    render: state.modal.renderProp
  }
}

export default connect(mapStateToProps, actions)(Modal);