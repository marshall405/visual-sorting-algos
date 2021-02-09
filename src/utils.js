async function swap(arr, i, j){
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function sleep(ms = 30) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


function random(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor( Math.random() * (max - min) + min)
}

export {
    swap, sleep, random
}