function mergesort(arr){
    if(arr.length === 1) return arr;

    const middle = Math.floor(arr.length / 2)
    const left = mergesort(arr.slice(0, middle))
    const right = mergesort(arr.slice(middle))

    const sortedArray = []
    let i = 0, j = 0

    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            sortedArray.push(left[i])
            i++
        } else {
            sortedArray.push(right[j])
            j++
        }
    }

    while(i < left.length) {
        sortedArray.push(left[i])
        i++
    }
    while(j < right.length) {
        sortedArray.push(right[j])
        j++
    }

    return sortedArray
}


Array.prototype.isEqual = function(arr){

    for(let i = 0; i < this.length; i++){
        if(this[i] != arr[i]) return false
    }

    return true 
}

mergesort([3,6,2,1,8,7]).isEqual([1,2,3,6,7,8]) //-> true
mergesort([1,2,3,4,5,6,7,8]).isEqual([1,2,3,4,5,6,7,8]) //-> true
mergesort([8,7,6,5,4,3,2,1]).isEqual([1,2,3,4,5,6,7,8]) //-> true
mergesort([1,1,1,1,1,1,1]).isEqual([1,1,1,1,1,1,1]) //-> true



