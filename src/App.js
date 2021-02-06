import React, {useState} from 'react';

import './App.css';


import NavBar from './components/NavBar';
import Quicksort from './components/Quicksort';
import Mergesort from './components/Mergesort';

function App() {
  const [link, setLink] = useState(2)

  return (
    <div className="App">
      <NavBar link={link} setLink={setLink}/>

      <main>
        { link === 1 ? <Quicksort /> : null}
        { link === 2 ? <Mergesort /> : null}
      </main>
    </div>
  );
}

export default App;
