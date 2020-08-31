import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Lang from 'src/libraries/languages';
import Button from 'src/components/atoms/button/button.container';
import logo from 'src/assets/icons/logo.svg';
import './home.module.scss';

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
          Learn React
        </a>

        <Button onClick={() => handleLanguage('en')}>English</Button>
        <Button onClick={() => handleLanguage('ja')}>Japanese</Button>
        <Link to="/users">User</Link>
      </header>
    </div>
  );
};

export default Home;
