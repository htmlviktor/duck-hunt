import React from 'react';

import style from './Congratulation.module.css';

function Congratulation({ name, result, onBtnClick }) {
  return (
    <div className={style.container}>
      <h2>
        Congratulation
        {' '}
        {name}
        !
      </h2>
      <p>
        Your result:
        {' '}
        {result}
      </p>
      <button onClick={onBtnClick} type="button">Play again</button>
    </div>
  );
}

export default Congratulation;
