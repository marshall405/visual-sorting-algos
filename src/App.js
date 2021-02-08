import React, {useState} from 'react';

import './App.css';


import NavBar from './components/NavBar';
import Quicksort from './components/Quicksort';
import Mergesort from './components/Mergesort';
import Bubblesort from './components/Bubblesort';

function App() {
  const [link, setLink] = useState(3)

  return (
    <div className="App">
      <NavBar link={link} setLink={setLink}/>

      <main>
        { link === 1 ? <Quicksort /> : null}
        { link === 2 ? <Mergesort /> : null}
        { link === 3 ? <Bubblesort /> : null}
      </main>
    </div>
  );
}

export default App;
