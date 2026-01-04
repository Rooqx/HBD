import React, { useState } from 'react';
import Loader from './components/Loader';
import BirthdayScene from './components/BirthdayScene';
import Overlay from './components/Overlay';

function App() {
  const [loading, setLoading] = useState(true);
  const [showScene, setShowScene] = useState(false);

  const handleLoaderComplete = () => {
    setLoading(false);
    setShowScene(true);
  };

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      {showScene && (
        <>
          <BirthdayScene />
          <Overlay />
        </>
      )}
    </>
  );
}

export default App;
