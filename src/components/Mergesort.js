import React, { useEffect} from 'react'

import p5 from 'p5'

import {sleep} from '../utils.js'
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
                values[i] = {
                    val: p.random(p.height),
                    id: i,
                    state: -1
                } 
                states[i] = -1
            }
            p.frameRate(120)
        }
        p.draw = () => {
            p.background(51);
            values.forEach( ({val,state},i) => {
                p.stroke(0)
                if(state === 0){
                    p.fill(138, 43, 226)
                }else if(state === 1){
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

    async function mergesort(a) {
        if (a.length <= 1) {
          return a;
        }
       
        let mid = Math.round( a.length / 2);
        
        let left = await mergesort(a.slice(0, mid))
        let right = await mergesort(a.slice(mid))
   
        return await merge(left,right);
      }
      
    async function merge(left, right) {
        if(!sorting) return 
        let leftIds = []
        left.forEach( ({id}) => {
            leftIds.push(id)
        })
    
        let leftIdx = values.findIndex( val => leftIds.includes(val.id))

        values.splice(leftIdx, left.length , ...left)

        values.splice(leftIdx + left.length, right.length, ...right)

        let sorted = [];
        while (left && left.length > 0 && right && right.length > 0) {
            if(!sorting) break
            if (left[0].val <= right[0].val) {
                values.find( val => val.id === left[0].id).state = 0
                let l = left.shift()
                l.state = 1
                sorted.push(l);
            }
            else {  
                values.find( val => val.id === right[0].id).state = 0
                let r = right.shift()
                r.state = 1
                sorted.push(r);
            }
            await sleep()
        }

        if(!sorting) return 

        sorted.forEach( val => val.state = 1)
        values.splice(leftIdx, sorted.length, ...sorted)
        values.forEach( val => val.state = -1)
        return sorted.concat(left, right);
    }

    const reset = () => {
        sorting = false
        document.getElementById('start').classList.remove('hide')
        for(let i = 0; i < values.length; i++){
            values[i] = {
                val: Math.random() * height,
                id: i,
                state: -1
            } 
        }
    }

    const start = async () => {
        if(!sorting) {
            sorting = true
            document.getElementById('start').classList.add('hide')
            await mergesort(values)
            if(sorting){
                values.forEach( val => val.state = 0)
            }

        }
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
            
                <div className="notes">
                    <p>In computer science, merge sort (also commonly spelled mergesort) is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.</p>
                    <p><a href="https://en.wikipedia.org/wiki/Merge_sort">Wikipedia</a></p>
                </div>
            </div>
            <div className="runtime">
                <div>
                    <div>
                        <h6> Time Complexity</h6>
                        <ul>
                            <li> Average: O(n log n)</li>
                            <li> Worst Case: O(n log n)</li>
                        </ul>
                    </div>
                    <div>
                        <h6> Space Complexity</h6>
                        <ul>
                            <li> O(n) </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <h3> How it works! </h3>
            <div className="info"> 
                <img src={Merge} alt=""/>
                <div>
                    
                </div>
            </div>
        </section>
        </>
    )
}
