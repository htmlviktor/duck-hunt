import React from 'react';

import classNames from 'classnames';
import style from './Counter.module.css';
import { PLAYER_STATE } from '../../settings';

function Counter({ progress, allCount }) {
  return (
    <div className={style.container}>
      {new Array(allCount).fill('').map((_, i) => (
        <span
          className={classNames(
            style.star,
            progress[i] === PLAYER_STATE.SUCCESS && style.active,
            progress[i] === PLAYER_STATE.LOOSE && style.loose,
          )}
          key={i}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default Counter;
