"use strict";

const fs = require('fs');

const preprocess = function (inputData, replaceDict) {
    // arrays are passed by reference
    // The keys are the indices the values are the new value of the array at the given index
    for (const [key, value] of Object.entries(replaceDict)) {
        inputData[key] = value

    }
};

const operator = function (first, second, opcode) {
    if (opcode === 1) {
        return first + second

    } else if (opcode === 2) {
        return first * second

    } else if (opcode === 99) {
        throw "Execution ended"

    }
};


const run = function (replaceDict) {
    let data = fs.readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);
    preprocess(data, replaceDict);

    let i;
    for (i = 0; i < data.length; i++) {
        if (i % 4 !== 0) {
            continue
        }
        try {
            data[data[i + 3]] = operator(data[data[i + 1]], data[data[i + 2]], data[i])
        } catch (e) {
            break
        }
    }
    return data[0]
};


let output_first = run({1: 12, 2: 2});
console.log(output_first);

let noun;
let verb;
let desiredValue = 19690720;
for (noun = 0; noun <= 99; noun++){
    for (verb = 0; verb <= 99; verb++){
        if (run({1: noun, 2: verb}) === desiredValue){
            console.log(100 * noun + verb);
            return
        }
    }
}
