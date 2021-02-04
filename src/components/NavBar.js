import React from 'react'

import '../styles/navbar.css'

export default function NavBar({link, setLink}) {
    return (
        <nav>
            <h1 className='logo'> Visual Sorting Algorithms </h1>
            <ul>
                <li className={ link === 1 ? 'active' : null} onClick={() => setLink(1)}> Quicksort </li>
                <li className={ link === 2 ? 'active' : null} onClick={() => setLink(2)}> Merge sort  </li>
                <li className={ link === 3 ? 'active' : null} onClick={() => setLink(3)}> Bubble sort </li>
            </ul>
        </nav>
    )
}
