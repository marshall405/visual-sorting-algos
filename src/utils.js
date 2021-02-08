async function swap(arr, i, j){
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function sleep(ms = 30) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export {
    swap, sleep
}