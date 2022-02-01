import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  // тут находиться навигация которая отрисовываеться если user выполнил вход , и кнопка выхода с функцией удаления данных о входе и отрисовкой loginpage
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
