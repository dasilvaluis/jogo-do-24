import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';

export const About = () => {
  const [ open, setOpen ] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <button type="submit" tabIndex={ 0 } onClick={ toggleOpen }>About</button>
      <Modal open={ open } onClose={ () => setOpen(false) }>
        <h2>24 Game</h2>
        <p>
          The 24 Game is an arithmetical card game in which the objective is to
          find a way to manipulate four integers so that the end result is 24.
          e.g. for a card with the numbers 6, 3, 7, 1 a possible solution is 6 * 3 + 7 - 1 = 24.
          <br />
          Read more @&nbsp;
          <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" rel="noopener noreferrer">Wikipedia</a>
        </p>
        <p>
          <b>Rules:</b>
          <br />
          - All numbers in the card must be used, without repeating them
          <br />
          - You may use any simple math operation (+, -, *, /)
          <br />
          - Final result must equal to 24
        </p>
        <small className="h-display-block h-margintop-sm">
          For the print version of all cards click&nbsp;
          <Link to="/print" target="_blank">here</Link>
        </small>
      </Modal>
    </div>
  );
};
