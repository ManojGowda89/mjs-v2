import React, { use, useEffect } from 'react';

const App = () => {

  useEffect(() => {
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  }, []);

  return (
    <div>
      <h1>My Manoj</h1>
      <img src="/img.jpg" alt="Logo" width="200" />
    </div>
  );
};

export default App;
