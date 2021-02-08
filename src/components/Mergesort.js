import React, { useEffect} from 'react'
import ReactEmbedGist from 'react-embed-gist'

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
        document.getElementById("content").classList.add('main')
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
        <div id="content">
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
                <ReactEmbedGist gist="marshall405/bbafb9d2622afc8cbd8b3014bb48620c"/>
                <section>
                    <p> Eh! <code>Mergesort</code>, am I right? Let's get started. We first create our base case so we can break out. 
                        Notice here that, unlike <code>quicksort</code>, we are returning an <code>array</code>! 
                        Next, we need to define the <code>middle</code> of the <code>array</code>. 
                        We can now call <code>mergesort</code> for both the left and right sides of our <code>array</code>. 
                        Everytime new call to <code>mergesort</code>, we are passing in a new <code>array</code>. 
                        We <code>recursively</code> continue to call <code>mergesort</code> until we return an <code>array</code> of length 1. 
                        We now have a <code>sorted array</code>. We will return back to Line 5 and Line 6 and continue on. 
                        We can now created an empty <code>array</code>, this will be used to push elements from both the left and right <code>arrays</code>. 
                        We can iterate over the left and right <code>arrays</code> and push the lesser element to the <code>sortedArray</code>. 
                        Once our first <code>while loop</code> breaks, we push any remaining elements from the left <code>array</code> and than any remaining elements from the right <code>array</code>. 
                        Finally, we return the <code>sortedArray</code> </p> 
                </section>
            </div>
        </section>
        </div>
    )
}
