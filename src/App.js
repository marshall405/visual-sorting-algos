import React, {useState} from 'react';

import './App.css';


import NavBar from './components/NavBar';
import Quicksort from './components/Quicksort';

function App() {
  const [link, setLink] = useState(1)

  return (
    <div className="App">
      <NavBar link={link} setLink={setLink}/>

      <main>
        { link === 1 ? <Quicksort /> : null}
      </main>
    </div>
  );
}

export default App;
