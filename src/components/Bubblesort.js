import React, { useEffect} from 'react'
import ReactEmbedGist from 'react-embed-gist'
import p5 from 'p5'

import {swap, sleep, random} from '../utils.js'



export default function Bubblesort() {
    let width = window.screen.width - 40
    let sorting = false
    let values = []
    let states = []
    let height;
    const Sketch = (p) => {
        let w = 10
        p.setup = () => {
            p.createCanvas(width > 600 ? 600 : width ,400)
            height = p.height
            values = new Array(p.floor(p.width / w))
            for(let i = 0; i < values.length; i++){
                let num = random(0, height)
                values[i] = {
                    height: num,
                    r: num,
                }
                states[i] = -1
            }
            p.frameRate(120)

        }
        p.draw = () => {
            p.background(51);
            values.forEach( (val,i) => {
                p.stroke(0)
                
                if(states[i] === 0){
                    p.fill(255)
                }else {
                    p.fill(0,val.r,val.r)
                }
                p.rect(i * w, p.height - val.height, w, val.height)
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
            await bubblesort(values)
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
                states[i+1] = 0
                if(
                    arr[i].r > arr[i + 1].r
                ){
                    await swap(arr, i, i + 1)
                    count++
                }
                await sleep(20)
                states[i+1] = -1
            }
            n++
            if(count === 0) break
        }

    }

    const reset = () => {
        sorting = false
        document.getElementById('start').classList.remove('hide')
        for(let i = 0; i < values.length; i++){
            let num = random(0, height)
            values[i].height = num
            values[i].r = num
            states[i] = -1
        }
    }

    return (
        <div id="content">
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
                <ReactEmbedGist gist="marshall405/c0fe7e5e86088e84bcb4649a27bc77f7"/>
                <section>
                    <p> Compare two elements and <code>swap</code> positions if the first element is greater than the second element. <code>array[j] > array[j + 1]</code></p>
                    <p> Continue through the <code>array</code> until we reach the end. At this point the largest number in the <code>array</code> will be the last element.</p>
                    <p> With the first pass through the <code>array</code> out of the way, we go back to the beginning, and repeat until the outer <code>for loop</code> has finished.</p>
                </section>
            </div>
        </section>
        </div>
    )
}