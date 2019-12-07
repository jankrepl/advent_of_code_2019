"use strict";

const fs = require('fs');
const cables = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const firstCable = cables[0].split(',');
const secondCable = cables[1].split(',');
const startingX = 0;
const startingY = 0;

const processor = function (currentX, currentY, instruction) {
    let directionString = instruction.charAt(0);
    let steps = Number(instruction.substr(1));

    let newX = currentX;
    let newY = currentY;

    if (directionString === 'U') {
        newY = newY + steps
    } else if (directionString === 'D') {
        newY = newY - steps
    } else if (directionString === 'R') {
        newX = newX + steps
    } else if (directionString === 'L') {
        newX = newX - steps
    }

    let i;
    let allStrings = [];
    for (i = 1; i <= steps; i++) {
        let repr = String(currentX + i * (newX - currentX) / steps) + ',' + String(currentY + i * (newY - currentY) / steps);
        allStrings.push(repr);

    }

    return [newX, newY, allStrings];

};

let allPositionsFirst = [];
let allPositionsSecond = [];

let i;
let currentX = startingX;
let currentY = startingY;
let allStrings;
for (i = 0; i < firstCable.length; i++) {
    [currentX, currentY, allStrings] = processor(currentX, currentY, firstCable[i]);
    allPositionsFirst = allPositionsFirst.concat(allStrings);
}

currentX = startingX;
currentY = startingY;
for (i = 0; i < secondCable.length; i++) {
    [currentX, currentY, allStrings] = processor(currentX, currentY, secondCable[i]);
    allPositionsSecond = allPositionsSecond.concat(allStrings);
}

let setFirst = new Set(allPositionsFirst);
let setSecond = new Set(allPositionsSecond);
let intersect = new Set([...setFirst].filter(x => setSecond.has(x)));

// 1st
let distanceFromCenter = Array.from(intersect).map(x => (x.split(',').map(Number).map(Math.abs)).reduce((a, b) => a + b, 0));
let res1 = Math.min(...distanceFromCenter);
console.log(res1);

// 2nd
let stepsFirst = [];
let stepsSecond = [];

let res2 = Math.max(allPositionsFirst.length + allPositionsSecond.length) + 2;

Array.from(intersect).forEach(function(value) {
    stepsFirst = allPositionsFirst.indexOf(value) + 1;
    stepsSecond = allPositionsSecond.indexOf(value) + 1;

    res2 = Math.min(res2, stepsFirst + stepsSecond);

});
console.log(res2);