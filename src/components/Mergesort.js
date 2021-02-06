import React, { useEffect, useRef} from 'react'

import p5 from 'p5'

import {swap,sleep} from '../utils.js'
import Merge from '../images/merge.png'

export default function Mergesort() {
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
        new p5(Sketch, document.getElementById('canvas'))
    })

    async function mergesort(arr){
        if(arr.length === 1) {
            return arr
        }

        const middle = Math.floor( arr.length / 2)
        let left, right
        Promise.all([
            left = await mergesort(arr.slice(0, middle)) ,
            right = await mergesort(arr.slice(middle))
        ])
        const sortedArr = []

        let i = 0, j = 0

        while(i < left.length && j < right.length){
            if(left[i] < right[j]){
                sortedArr.push(left[i++])
            } else {
                sortedArr.push(right[j++])
            }
        }
        while(i < left.length) sortedArr.push(left[i++])
        while(j < right.length) sortedArr.push(right[j++])

        return sortedArr
    }

    
    
    const reset = () => {
        sorting = false
        document.getElementById('start').classList.remove('hide')
        for(let i = 0; i < values.length; i++){
            values[i] = Math.random() * height
            states[i] = -1
        }
    }

    const start = async () => {
        if(sorting) return
        mergesort(values).then(vals => values = vals)
        
    }
    return (
        <>
        <section>
            <h1>  <code> mergesort() </code> </h1>
            <div className="container">
                <div className="actions col-1">
                    <button id="start" onClick={start} > Start </button>
                    <button onClick={reset}> Reset </button>
                </div>
                <div id="canvas"></div>
                <div className="col-1"></div>
            </div>
        </section>
        <section>
            <h3> How it works! </h3>
            <div className="info"> 
                <img src={Merge}/>
                <div>
                    <p>In computer science, merge sort (also commonly spelled mergesort) is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.</p>
                    <p><a href="https://en.wikipedia.org/wiki/Merge_sort">Wikipedia</a></p>
                </div>
            </div>
        </section>
        </>
    )
}
