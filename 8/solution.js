"use strict";


const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim();


/**
 * Converts raw input into list of lauers
 * @param code
 * @param height
 * @param width
 * @return Array The object is an array of arrays or arrays representing different layers
 */
const convertToLayers = function (code, height, width) {
    let finalArray = [];
    const nPixels = height * width;
    const codeLength = code.length;
    const nArrays = codeLength / nPixels;

    let layerTemplate = [];
    for (let r = 0; r < height; r++) {
        layerTemplate.push(new Array(width))
    }


    for (let i = 0; i < nArrays; i++) {
        finalArray.push(layerTemplate.slice().map(x => x.slice()))
    }

    // final array [layer, r, c]
    for (let i = 0; i < codeLength; i++) {
        let layer = Math.floor(i / nPixels);
        let r = Math.floor((i % nPixels) / width);
        let c = (i % nPixels) % width;
        // console.log('Layer: ' + String(layer) + ', r: ' + String(r) + ', c: ' + String(c))
        finalArray[layer][r][c] = Number(code[i])


    }
    return finalArray

};

const countDigits = function (nestedArray, digit) {
    let count = 0;
    let height = nestedArray.length;
    let width = nestedArray[0].length;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (nestedArray[r][c] === digit) {
                count += 1
            }
        }
    }
    return count
};

const argMin = function (array1D) {
    let currentMin = array1D[0];
    let currentArgMin = 0;

    for (let i = 1; i < array1D.length; i++) {
        if (array1D[i] < currentMin) {
            currentMin = array1D[i];
            currentArgMin = i;

        }
    }
    return currentArgMin

};

const turnIntoString = function (nestedArray, withNewLine) {
    let out = '';
    let height = nestedArray.length;
    let width = nestedArray[0].length;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            out += String(nestedArray[r][c])

        }
        if (withNewLine && (r !== height - 1)) {
            out += '\n'
        }
    }
    return out
};

const height = 6;
const width = 25;
let finalArray = convertToLayers(data.slice(), height, width);
const nZeros = finalArray.map(x => countDigits(x, 0));
const ix = argMin(nZeros);
const res1 = countDigits(finalArray[ix], 1) * countDigits(finalArray[ix], 2);
console.log(res1);

let finalImage = [];
for (let r = 0; r < height; r++) {
    finalImage.push(new Array(width))
}
for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
        let layer = 0;
        while (true) {
            if (finalArray[layer][r][c] !== 2) {
                finalImage[r][c] = finalArray[layer][r][c];
                break
            } else {
                layer += 1
            }
        }

    }
}

const remap = function (currentString, mapDict) {
    let out = '';
    let length = currentString.length;

    for (let i = 0; i < length; i++) {
        if (currentString[i] in mapDict) {
            out += mapDict[currentString[i]]

        } else {
            out += currentString[i]
        }
    }
    return out
};


const res2 = turnIntoString(finalImage, false);
console.log(res2);
