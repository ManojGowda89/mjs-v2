import React from 'react';

const App = () => {
  console.log(process.env.REACT_APP_API_URL); // ✅ not import.meta.env

  return <h1>Hello from MB64</h1>;
};

export default App;
