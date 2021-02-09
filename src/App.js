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
      <a class="github-fork-ribbon" href="https://github.com/marshall405/visual-sorting-algos" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
      <main id="main">
        { link === 1 ? <Quicksort /> : null}
        { link === 2 ? <Mergesort /> : null}
        { link === 3 ? <Bubblesort /> : null}
        <footer> Marshall Slemp </footer> 
      </main>
    </div>

  );
}

export default App;
