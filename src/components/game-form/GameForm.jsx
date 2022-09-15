import React, { useState } from 'react';

import style from './GameForm.module.css';

function GameForm({ onSubmit, isDisabled }) {
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);

  const handleTextChange = (e) => {
    setName(e.target.value);
  };

  const handleCountChange = (e) => {
    if (e.target.value < 1) {
      setCount(1);
      return;
    }
    if (e.target.value > 10) {
      setCount(10);
      return;
    }
    setCount(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, count });
  };

  return (
    <form className={style.form} onSubmit={handleFormSubmit}>
      <h2 className={style.title}>Hello Hunter</h2>
      <div className={style.container}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Your name:</span>
          <input onChange={handleTextChange} value={name} type="text" placeholder="Write here..." />
        </label>
        <label>
          <span>Select count games (1-10):</span>
          <input onChange={handleCountChange} type="number" value={count} />
        </label>
      </div>
      <button type="submit" disabled={!isDisabled} className={style.button}>Play Game</button>
      {isDisabled && <span>Socket ready:)</span>}
      {!isDisabled && <span>Socket not ready:)</span>}
    </form>
  );
}

export default GameForm;
