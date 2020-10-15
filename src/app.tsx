import React from 'react';
import * as Contexts from 'src/contexts';

const App: React.FC = ({ children }) => {
  const wrappedChildren = Object.keys(Contexts).reduce((child, key) => {
    const ContextProvider = Contexts[key];

    return <ContextProvider>{child}</ContextProvider>;
  }, children);

  return <>{wrappedChildren}</>;
};

export default App;
