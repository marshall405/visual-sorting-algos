function bubblesort(array) {
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            if(array[j] > array[j+1]){
                swap(array, j, j + 1)
            }
        }
    }
}

function swap(arr, i, j){
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}


let values = [4,5,7,2,3,1,9,12,1,30,567,43,45,78,34,25,24,67]
bubblesort(values)
console.log(values)



