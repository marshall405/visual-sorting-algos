import React, { useEffect} from 'react'
import ReactEmbedGist from 'react-embed-gist'

import p5 from 'p5'

import {swap, sleep} from '../utils.js'

export default function Quicksort() {
    let width = window.screen.width - 40
    let sorting = false
    let values = []
    let states = []
    let height;
    const Sketch = (p) => {
        let w = 5
        p.setup = () => {
            p.createCanvas(width > 600 ? 600 : width ,400)
            height = p.height
            values = new Array(p.floor(p.width / w))
            for(let i = 0; i < values.length; i++){
                values[i] = p.random(p.height)
                states[i] = -1
            }
            p.frameRate(120)

        }
        p.draw = () => {
            p.background(51);
            values.forEach( (val,i) => {
                p.stroke(0)
                if(states[i] === 0){
                    p.fill(138, 43, 226)
                }else if(states[i] === 1){
                    p.fill(134, 238, 177)
                }else {
                    p.fill(255)
                }
                p.rect(i * w, p.height - val, w, val)
            })
        }
        
    }
    useEffect( () => {
        new p5(Sketch, document.getElementById("canvas"))
        document.getElementById("content").classList.add('main')
    })

    const startSort = async () => {
        if(!sorting){
            sorting = true
            document.getElementById('start').classList.add('hide')
            await quicksort(values, 0, values.length - 1)
            states.forEach( (state,i) => states[i] = 0 )
        }
    }

    async function quicksort(arr, start, end) {

        if(start >= end || !sorting) return

        let index = await partition(arr, start, end)
        states[index] = -1
        await Promise.all([
            quicksort(arr, start, index - 1),
            quicksort(arr, index + 1, end)
        ])

    }

    async function partition(arr, start, end) {
        for(let i = start; i < end; i++){
            states[i] = 1
        }
        let pivot = arr[end]
        let index = start
        states[index] = 0
        for(let i = start; i < end; i++){
            if(arr[i] <= pivot) {
                await sleep()
                swap(arr, i, index)
                states[index] = -1
                index++
                states[index] = 0
            }
        }
        await sleep()
        swap(arr, index, end)
        for(let i = start; i < end; i++){
            states[i] = -1
        }
        return index
    }
    

    const reset = () => {
        sorting = false
        document.getElementById('start').classList.remove('hide')
        for(let i = 0; i < values.length; i++){
            values[i] = Math.random() * height
            states[i] = -1
        }
    }

    return (
        <div id="content">
        <section>
            <h1>  <code> quicksort() </code> </h1>
            <div className="container">
                <div className="actions col-1">
                    <button id="start" onClick={startSort}> Start </button>
                    <button onClick={reset}> Reset </button>
                </div>
                <div id="canvas"></div>
                <div className="notes">
                    <p>Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.</p>
                    <p><a href="https://en.wikipedia.org/wiki/Quicksort">Wikipedia</a></p>
                </div>
            </div>
            <div className="runtime">
                <div>
                    <div>
                        <h6> Time Complexity</h6>
                        <ul>
                            <li> Best Case: O(n log n)</li>
                            <li> Average: O(n log n)</li>
                            <li> Worst Case: O(n^2)</li>
                        </ul>
                    </div>
                    <div>
                        <h6> Space Complexity</h6>
                        <ul>
                            <li> O(log n) </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <h3> How it works! </h3>
            <div className="info"> 
                <ReactEmbedGist gist="marshall405/5ae084e8a53c1c2a271e0a1074e448a2"/>
                <section>
                   <p>
                        We start by creating our base case to make sure we can break out. We then define our <code>index</code> and call <code>partition()</code>. Once <code>partition()</code> returns, we call Line: 6 - <code>quicksort(array, start, index -1 )</code> and Line 7 - <code>quicksort(array, index + 1, end)</code>. Now, you may be wondering why we are passing in <code>index - 1</code> and <code>index + 1</code>?. We do this because our <code>partition()</code> function will return the <code>index</code> of an element where everything to the left of it is less than and everything to the right is greater than.(We will disucss furthur, down below)
                   </p>
                   <p>
                       Our <code>partition()</code> function is where the logic of <code>quicksort</code> lives. 
                       We first define our <code>pivot</code>, in the example to the left, we use the last element in the array. 
                       Next, we define our <code>pivotIndex</code> to equal the <code>start</code>. 
                       This is because we want to track where, in the array, we should <code>swap</code> elements. 
                       We can now <code>loop</code> through our array. For each element, we check if its less than or equal to our <code>Pivot</code>(defined on Line 13). 
                       If its true, we <code>swap</code> our current element in our <code>for loop</code> with the element at the <code>pivotIndex</code>.
                        Keep in mind, we are not swaping our <code>Pivot</code>, we are using a variable defined as <code>pivotIndex</code>, which is originally equal to our <code>start</code> variable. 
                        Everytime we make a <code>swap</code>, we need to <code>increment</code> our <code>pivotIndex</code> by one. 
                        Once our <code>for loop</code> ends, we make our final <code>swap</code>, this time our <code>pivot</code> and <code>pivotIndex</code>. 
                        Now our array has all elements less than our <code>pivot</code> to the left and all elements greater than the <code>pivot</code> to the right. 
                        We can now return the <code>pivotIndex</code>.
                    </p>
                </section>
            </div>
        </section>
        </div>
    )
}