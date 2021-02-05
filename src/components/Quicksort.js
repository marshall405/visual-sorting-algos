import React, { useEffect, useRef} from 'react'

import p5 from 'p5'

import {swap} from '../utils.js'



export default function Quicksort() {
    const canvas = useRef(null)
    let sorting = false
    let values = []
    let states = []
    let s = useRef(null)

    const Sketch = (p) => {
        let w = 5
        p.setup = () => {
            p.createCanvas(600,400)
            values = new Array(p.floor(p.width / w))
            for(let i = 0; i < values.length; i++){
                values[i] = p.random(p.height)
                states[i] = -1
            }
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
        s.current = new p5(Sketch, canvas.current)
    })

    const startSort = () => {
        if(!sorting){
            sorting = true
            document.getElementById('start').classList.add('hide')
            quicksort(values, 0, values.length - 1)
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
    
    function sleep() {
        return new Promise(resolve => setTimeout(resolve, 30))
    }
    const reset = () => {
        sorting = false
        document.getElementById('start').classList.remove('hide')
        for(let i = 0; i < values.length; i++){
            values[i] = s.current.random(s.current.height)
            states[i] = -1
        }
    }

    return (
        <>
        <section>
            <h1>  <code> quicksort() </code> </h1>
            <div className="container">
                <div className="actions col-1">
                    <button id="start" onClick={startSort}> Start </button>
                    <button onClick={reset}> Reset </button>
                </div>
                <div ref={canvas}></div>
                <div className="col-1"></div>
            </div>
        </section>
        <section>
            <h3> How it works! </h3>

            <code>
                <ul>
                {`  function quicksort(arr, start, end) { `}

                <li>
                    {`if(start >= end) return`}
                </li>
                <li>
                    {`let index = partition(arr, start, end) `}
                </li>
                <li>
                    {`quicksort(arr, start, index - 1) `}
                </li>
                <li>
                    {`quicksort(arr, index + 1, end) `}
                </li>
                {`    }`}
                </ul>
                <ul>
 
                {`    function partition(arr, start, end) {`}

                <li> 
                {`        let pivot = arr[end] `}
                </li>
                <li> 
                {`        let index = start `}
                </li>
             
                    <li>
                {`        for(let i = start; i < end; i++) {`}
                </li>
                <ul className="forloop"> 
                <li> 
                    {`            if(arr[i] <= pivot){`}
                    </li>
                    <div className="ifstate">
                    <li> 
                        {`           let tmp = arr[i]`}
                        </li>
                        <li> 
                        {`      arr[i] = arr[index]`}
                        </li>
                        <li> 
                        {`      arr[index] = tmp`}
                        </li>
                        <li> 
                        {`      index++`}
                        </li>
                        </div>
                        <li> 
                        {`  }`}
                        </li>
                        </ul>
                        <li> 
                        {`  }`}
                        </li>
                        <li> 
                        {` let tmp = arr[index]`}
                        </li>
                        <li> 
                        {`    arr[index] = pivot`}
                        </li>
                        <li> 
                        {` arr[end] = tmp`}
                        </li>
                        <li> 
                        {` return index`}
                        </li>
                        {`  }`}
                        </ul>
            </code>
            <p> Quicksort uses recursion and relies on another call to a partition. The partition is where the real logic for this algorithm lives. The partition function </p>
        </section>
        </>
    )
}