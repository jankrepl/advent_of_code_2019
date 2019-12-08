"use strict";

const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);

let binaryOps = [1, 2, 5, 6, 7, 8];
let unaryOps = [3, 4];

const run = function (data, inputInstruction, verbose) {

    let i = 0;
    let tempStdOut = [];

    if (verbose) {
        console.log(data)
    }
    while (i < data.length) {
        let initialCodeStr = String(data[i]);
        let expandedCode = '0'.repeat(5 - initialCodeStr.length) + initialCodeStr;
        let operation = Number(expandedCode.substr(3));  // 1, 2, 3, 4, 99
        let pointerDelta;
        let indexToModify;
        let firstParameterMode = Number(expandedCode[2]);
        let secondParameterMode = Number(expandedCode[1]);
        let firstParameter;
        let secondParameter;

        if (operation === 99) {
            break
        }
        // READING
        if (binaryOps.includes(operation)) {
            indexToModify = data[i + 3];
            if (firstParameterMode === 0) {
                firstParameter = data[data[i + 1]]
            } else {
                firstParameter = data[i + 1]
            }
            if (secondParameterMode === 0) {
                secondParameter = data[data[i + 2]]
            } else {
                secondParameter = data[i + 2]
            }
        }

        if (unaryOps.includes(operation)) {
            indexToModify = data[i + 1]

        }

        switch (operation) {
            case 1: // write instruction
                pointerDelta = 4;
                break;
            case 2: // write instruction
                pointerDelta = 4;
                break;
            case 3: // write instruction
                pointerDelta = 2;
                break;
            case 4:
                pointerDelta = 2;
                break;
            case 5:
                if (firstParameter !== 0) {
                    pointerDelta = secondParameter - i
                } else {
                    pointerDelta = 3
                }
                break;
            case 6:
                if (firstParameter === 0) {
                    pointerDelta = secondParameter - i
                } else {
                    pointerDelta = 3
                }
                break;
            case 7:
                pointerDelta = 4;
                break;
            case 8:
                pointerDelta = 4;
                break;
            case 99:
                pointerDelta = 1;  // there are multiple possibly
                break;


        }
        // WRITING
        switch (operation) {
            case 1: // write instruction
                data[indexToModify] = firstParameter + secondParameter;
                break;
            case 2: // write instruction
                data[indexToModify] = firstParameter * secondParameter;
                break;
            case 3: // write instruction
                data[indexToModify] = inputInstruction;
                break;
            case 4:
                if (verbose) {
                    console.log(data[indexToModify])

                } else {
                    tempStdOut.push(data[indexToModify])
                }
                break;
            case 5:
            //
            case 6:
            //
            case 7:
                if (firstParameter < secondParameter) {
                    data[indexToModify] = 1
                } else {
                    data[indexToModify] = 0
                }
                break;
            case 8:
                if (firstParameter === secondParameter) {
                    data[indexToModify] = 1
                } else {
                    data[indexToModify] = 0
                }

        }
        if (verbose) {
            console.log('i = ' + String(i) + ', operation = ' + String(operation) + ', pointerdelta = ' + String(pointerDelta))
            console.log(data)
        }
        i += pointerDelta
    }
    return tempStdOut

};

let exit_codes_1 = run(data.slice(), 1, false);
console.log(exit_codes_1[exit_codes_1.length - 1]);

let exit_codes_2 = run(data.slice(), 5, false);
console.log(exit_codes_2[exit_codes_2.length - 1]);
