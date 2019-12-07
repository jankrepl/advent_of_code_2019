"use strict";

const fs = require('fs');


let data = fs.readFileSync('input.txt', 'utf-8').trim().split('-').map(Number);
let rangeMin = data[0];
let rangeMax = data[1];


let adjacentCheck = function (myString) {
    let foundPair = false;
    let i;
    for (i = 0; i < myString.length - 1; i++) {
        foundPair = myString.charAt(i) === myString.charAt(i + 1);
        if (foundPair) {
            break
        }
    }
    return foundPair
};

let uniqueAdjacentCheck = function (myString) {
    let pairOccurance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let i;
    for (i = 0; i < myString.length - 1; i++) {
        if (myString.charAt(i) === myString.charAt(i + 1)) {
            pairOccurance[Number(myString.charAt(i))] += 1;
        }
    }
    return pairOccurance.indexOf(1) !== -1
};

let increasingCheck = function (myString) {
    let isIncreasing = true;
    let i;
    for (i = 0; i < myString.length - 1; i++) {
        isIncreasing = Number(myString.charAt(i)) <= Number(myString.charAt(i + 1));
        if (!isIncreasing) {
            break
        }
    }
    return isIncreasing
};

let overallCheck = function (myNumber, taskNumber) {
    let myString = String(myNumber);
    if (taskNumber === 1) {
        return adjacentCheck(myString) && increasingCheck(myString)
    } else {
        return uniqueAdjacentCheck(myString) && increasingCheck(myString)
    }

};


let res1 = 0;

let i;
for (i = rangeMin; i <= rangeMax; i++) {
    if (overallCheck(i, 1)) {
        res1 += 1
    }
}
console.log(res1);

let res2 = 0;

for (i = rangeMin; i <= rangeMax; i++) {
    if (overallCheck(i, 2)) {
        res2 += 1
    }
}
console.log(res2);

