import React from 'react';
import PropTypes from 'prop-types';
import './calculator.scss';

export function CalculatorButton({
  children,
  type,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      className={ `calculator__button -${ type }` }
      disabled={ disabled }
      onClick={ onClick }
    >
      { children }
    </button>
  );
}

CalculatorButton.defaultProps = {
  type: 'square',
};

CalculatorButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([ 'square', 'vertical-rect' ]),
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
