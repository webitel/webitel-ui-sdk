import React from 'react';

export function LogoRenderer() {
  function toggleDarkTheme() {
    document.documentElement.classList.toggle('theme--dark');
  }

  return (
    <label>
      <input type="checkbox" onInput={toggleDarkTheme}></input>
       Toggle dark
    </label>
  );
}

export default LogoRenderer;
