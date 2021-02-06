function quicksort(array, start, end){
    if(start >= end) return

    const index = partition(array, start, end)

    quicksort(array, start, index - 1)
    quicksort(array, index + 1, end)

}

function partition(array, start, end) {

    const pivot = array[end]
    let pivotIndex = start

    for(let i = start; i < end; i++){
        if(array[i] <= pivot){
            swap(array, pivotIndex, i)
            pivotIndex++
        }
    }

    swap(array, pivotIndex, end)
    return pivotIndex
}

function swap(arr, i, j){
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}


let arr1 = [43,23,87,2,1,98,7,56,84]

quicksort(arr1, 0, arr1.length - 1)
console.log(arr1)