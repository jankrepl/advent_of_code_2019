"use strict";

const fs = require('fs');
const Hardware = require('./hardware.js');
let data = fs.readFileSync('input.txt', 'utf-8').trim().split(',');


/**
 * Run for a single combination of phases our amplifier device
 * @param data {Array} Array of strings representing the initial memory state
 * @param phasePerAmplifier {Array} 5 element Array of strings representing the phase of amplifiers A, B, C, D, E
 * @param allowLoop {Boolean} If true then looping until one halts
 * @return {Number} Output of amplifier E (either after one round or undetermined looping)
 */
const runForFixedPermutation = function (data, phasePerAmplifier, allowLoop) {
    const amplifiers = [
        new Hardware(data.slice(), Number(phasePerAmplifier[0])),
        new Hardware(data.slice(), Number(phasePerAmplifier[1])),
        new Hardware(data.slice(), Number(phasePerAmplifier[2])),
        new Hardware(data.slice(), Number(phasePerAmplifier[3])),
        new Hardware(data.slice(), Number(phasePerAmplifier[4]))
    ];

    let currentAmplifierIndex = 0;
    let signal = 0;

    while (true) {
        let tempOutput = amplifiers[currentAmplifierIndex].run([signal]);

        if (tempOutput === undefined) {
            // program halted without standard output
            return signal
        } else {
            signal = tempOutput
        }

        if ((!allowLoop) && (currentAmplifierIndex === 4)) {
            return signal
        }

        currentAmplifierIndex = ((currentAmplifierIndex + 1) % 5)
    }

};

let permArr = [],
    usedChars = [];

function permute(input) {
    let i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length === 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }


    return permArr
}

let allPerms1 = permute(['0', '1', '2', '3', '4']);
let res1 = 0;

for (let i = 0; i < allPerms1.length; i++) {
    res1 = Math.max(res1, runForFixedPermutation(data, allPerms1[i], false))
}

console.log(res1);

let allPerms2 = permute(['5', '6', '7', '8', '9']);
let res2 = 0;

for (let i = 0; i < allPerms2.length; i++) {
    res2 = Math.max(res2, runForFixedPermutation(data, allPerms2[i], true))
}

console.log(res2);