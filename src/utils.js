async function swap(arr, i, j){
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function sleep() {
    return new Promise(resolve => setTimeout(resolve, 30))
}

export {
    swap, sleep
}