let list = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  
function sort(originalList) {
    let newList = originalList.sort();

    //TODO: sorting

    return newList;
}

function myBinarySearch() {
    //
}

function main() {

    for(let i = 0; i < 10; i++){
        list.push(getRandomInt(10));
    }

    console.log("Original", list);

    const newList = sort(list);


    console.log("Sorted", newList);
}

main();


