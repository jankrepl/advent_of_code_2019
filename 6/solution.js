"use strict";

const fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

// left is parent, right is child
function MyNode(name) {
    this.name = name;
    this.parent;
    this.children = [];
    this.findDepth = function () {
        if (this.parent === undefined) {
            return 0

        } else {
            return 1 + this.parent.findDepth()

        }
    };
    this.findAllParents = function () {
        if (this.parent === undefined) {
            return []
        } else {
            return [this.parent.name].concat(this.parent.findAllParents())
        }

    };
}

const findNode = function (inputTree, nodeName) {
    let nodeIndex = -1;
    for (let i = 0; i < inputTree.length; i++) {
        if (inputTree[i].name === nodeName) {
            nodeIndex = i;
            break  // name assumed unique
        }
    }
    return nodeIndex
};

const run = function (data) {
    let myTree = [];
    for (let i = 0; i < data.length; i++) {
        let parentNodeName = data[i].split(')')[0];
        let childNodeName = data[i].split(')')[1];

        // find if node already on the tree (return index) or not (return -1)
        let parentNodeIndex = findNode(myTree, parentNodeName);
        let childNodeIndex = findNode(myTree, childNodeName);

        let parentNode;
        let childNode;

        // Find/create parent
        if (parentNodeIndex === -1) {
            parentNode = new MyNode(parentNodeName);
            myTree.push(parentNode)
        } else {
            parentNode = myTree[parentNodeIndex]
        }

        // Find/create child
        if (childNodeIndex === -1) {
            childNode = new MyNode(childNodeName);// maybe assert it was undefined before
            myTree.push(childNode)
        } else {
            childNode = myTree[childNodeIndex]
        }

        // Update parent
        if (!parentNode.children.includes(childNode)) {
            parentNode.children.push(childNode)
        }
        // Update child
        childNode.parent = parentNode;

    }
    return myTree
};

let myTree1 = run(data.slice());
let all_depths1 = myTree1.map(x => x.findDepth());
let res1 = all_depths1.reduce((a, b) => a + b, 0);
console.log(res1);

let youNodeIndex = findNode(myTree1, 'YOU');
let santaNodeIndex = findNode(myTree1, 'SAN');
let youAllParents = myTree1[youNodeIndex].findAllParents().reverse();
let santaAllParents = myTree1[santaNodeIndex].findAllParents().reverse();

let i;
for (i = 0; i < Math.min(youAllParents.length, santaAllParents.length); i++) {
    if (!(youAllParents[i] === santaAllParents[i])) {
        break
    }
}
let youNodesToCommonParent = youAllParents.length - i;
let santaNodesToCommonParent = santaAllParents.length - i;

console.log(youNodesToCommonParent + santaNodesToCommonParent);
