import React from 'react';
import * as Contexts from 'src/contexts';

const App: React.FC = (props) => {
  const children = Object.keys(Contexts).reduce((child, key) => {
    const ContextProvider = Contexts[key];

    return <ContextProvider>{child}</ContextProvider>;
  }, props.children);

  return <>{children}</>;
};

export default App;
