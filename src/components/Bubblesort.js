import React, { useEffect} from 'react'

import p5 from 'p5'

import {swap, sleep} from '../utils.js'

import bubbleImg from '../images/bubble.png'

export default function Bubblesort() {
    let sorting = false
    let values = []
    let states = []
    let height;
    const Sketch = (p) => {
        let w = 5
        p.setup = () => {
            p.createCanvas(600,400)
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
    })

    const startSort = async () => {
        if(!sorting){
            sorting = true
            document.getElementById('start').classList.add('hide')
            await bubblesort(values)
            if(sorting){
                states.forEach( (state,i) => states[i] = 0 )
            }
        }
    }

    async function bubblesort(arr) {
        let count
        let n = 1
        while(true){
            if(!sorting) break
            count = 0
            for(let i = 0; i < arr.length - n; i++){
                if(!sorting) break
                states[i + 1] = 1

                if(arr[i] > arr[i + 1]){
                    await swap(arr, i, i + 1)
                    count++
                }
                await sleep(4)
                states[i+1] = -1
            }
            n++
            await sleep(20)
            if(count === 0) break
        }

        if(!sorting) {
            for(let i = 0; i < values.length; i++){
                states[i] = -1
            }
        }
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
        <>
        <section>
            <h1>  <code> bubblesort() </code> </h1>
            <div className="container">
                <div className="actions col-1">
                    <button id="start" onClick={startSort}> Start </button>
                    <button onClick={reset}> Reset </button>
                </div>
                <div id="canvas"></div>
                <div className="notes">
                    <p>Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.</p>
                    <p><a href="https://en.wikipedia.org/wiki/Bubble_sort">Wikipedia</a></p>
                </div>
            </div>
            <div className="runtime">
                <div>
                    <div>
                        <h6> Time Complexity</h6>
                        <ul>
                            <li> Best Case: O(n)</li>
                            <li> Average: O(n^2)</li>
                            <li> Worst Case: O(n^2)</li>
                        </ul>
                    </div>
                    <div>
                        <h6> Space Complexity</h6>
                        <ul>
                            <li> O(1) </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <h3> How it works! </h3>
            <div className="info"> 
                <img src={bubbleImg} alt=""/>
                <div>
                    <p> Compare two elements and swap positions if the first element is greater than the second element. array[ j ] > array[ j + 1 ]</p>
                    <p> Continue through the array until we reach the end. At this point the largest number in the array will be the last element.</p>
                    <p> With the first pass through the array out of the way, we go back to the beginning, and repeat until the outer for loop has finished.</p>
                </div>
            </div>
        </section>
        </>
    )
}