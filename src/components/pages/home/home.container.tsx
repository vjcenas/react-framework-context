import React, { useCallback, useState } from 'react';

import logo from '../../../assets/icons/logo.svg';
import './home.module.scss';
import Lang from '../../../libraries/languages';

const Home: React.FC = () => {
  const [update, setUpdate] = useState('en');

  const handleLanguage = useCallback(
    (locale) => {
      setUpdate(locale);
    },
    [setUpdate]
  );

  Lang.setLanguage(update);

  return (
    <div className="App">
      <header className="App-header">
        {Lang.MSG_VALIDATION_ERROR_REQUIRED}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React in {update}
        </a>

        <button onClick={() => handleLanguage('en')}>English</button>
        <button onClick={() => handleLanguage('ja')}>Japanese</button>
      </header>
    </div>
  );
};

export default Home;
