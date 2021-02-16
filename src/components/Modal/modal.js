import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export const Modal = ({
  open,
  children,
  onClose,
}) => (
  <>
    { open && (
      <div className="modal">
        <span
          className="modal__close"
          role="button"
          tabIndex={ 0 }
          aria-label="Close Dialog"
          onClick={ onClose }
          onKeyUp={ () => null }
        >
          X
        </span>
        <div>
          { children }
        </div>
      </div>
    ) }
  </>
);

Modal.defaultProps = {
  onClose: () => {},
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};
