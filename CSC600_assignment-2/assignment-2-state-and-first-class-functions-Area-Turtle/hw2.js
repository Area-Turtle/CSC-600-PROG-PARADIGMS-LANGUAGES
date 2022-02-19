"use strict";
/* ==========================================================================  **
## HW2 Instructions

1. Push your solution, contained entirely in hw2.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc hw2.ts
   ```
   to produce a file `hw2.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw2.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */
exports.__esModule = true;
exports.betterHashFromLeafToRoot = exports.checkMerkleTreeHash = exports.hashFromLeafToRoot = exports.arrayToMerkleTree = exports.MNode = exports.MLeaf = exports.fillInMissingPath = exports.countPaths = exports.allPaths = exports.countPathsSatisfyingPredicate = exports.allPathsSatisfyingPredicate = exports.jsonLinkExample = exports.CPair = exports.CBetterPair = exports.CUnsafePair = exports.registerCallbacks = exports.arrayOfArithmeticFunctions = exports.f5 = exports.f4 = exports.f3 = exports.f2 = exports.f1 = exports.RESOURCES_CONSULTED = exports.COLLABORATORS = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
exports.HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
exports.SIGNATURE = "Zachary Ma"; // TODO: FILL ME IN
// If you had any collaborators on this assignment, please list their github handles here.
exports.COLLABORATORS = [
    "github handle of collaborator 1", // TODO: FILL ME IN
];
// If you used any resources, please list them here
exports.RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];
/* ==========================================================================  **
## Problem 1: First-Class Functions

This problem will get you thinking about first-class functions.
You do **not** need to answer comments labeled "food for thought".
Throughout this problem, you are only allowed to write **pure** functions. That
is, the function itself and any helper functions it uses must be **pure** functions.

** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 1a

Implement the following five pure functions, i.e., no side-effects.
They have generic types, and the types of the parameters, return values,
and generics should give you all the hints you need about how to
implement them. For each one, return the simplest possible function
that will satisfy the type system.

Hint: each function body is 1 line.
** ----------------------------------------------------- */
function f1() {
    // TODO: implement me
    //throw Error("TODO");
    return function (arg) { return arg; };
}
exports.f1 = f1;
//console.log(f1())
function f2(arg1, arg2) {
    // TODO: implement me
    // Food for thought: what is this function doing?
    //throw Error("TODO");
    return arg2(arg1);
}
exports.f2 = f2;
function f3(arg1) {
    // TODO: implement me
    // Food for thought: how is f3 related to f2?
    //throw Error("TODO");
    return function (arg2) { return arg2(arg1); };
}
exports.f3 = f3;
function f4(arg1, arg2, arg3) {
    // TODO: implement me
    //throw Error("TODO");
    return arg3(arg1)(arg2);
}
exports.f4 = f4;
function f5(arg1, arg2, arg3) {
    // TODO: implement me
    // Food for thought: how is f5 related to f4?
    //throw Error("TODO");
    return arg3(arg1, arg2);
}
exports.f5 = f5;
/* ----------------------------------------------------- **
### Problem 1b

Write a function arrayOfArithmeticFunctions that takes in an array
of type ("plus"|"minus"|"times"|"divide")[] and returns an array
with functions that implement + (for "plus"), - (for "minus"), *
(for "times"), or / (for "divide"). You are guaranteed that there
are no duplicate strings in the array. Return the functions in the
order that they are specified in the input array with strings.

Example 1:

> const fnArr = arrayOfArithmeticFunctions(["plus"])
> fnArr[0](1, 2)
3
> fnArr[0](1, 4)
5


Example 2:

> const fnArr = arrayOfArithmeticFunctions(["times", "minus"])
> fnArr[0](1, 2)
2
> fnArr[0](2, 3)
6
> fnArr[1](1, 2)
-1
> fnArr[1](5, 3)
2

** ----------------------------------------------------- */
function arrayOfArithmeticFunctions(names) {
    // TODO: implement me
    var numbers = [];
    for (var i = 0; i < names.length; i++) {
        numbers.push(names[i]);
        if (numbers[0] = "plus") {
            var plus = function (x, y) { return x + y; };
            var array1 = [plus];
            return [plus];
        }
        if (numbers[1] = "minus") {
            var minus = function (x1, y1) { return x1 - y1; };
            var array2 = [minus];
            return [minus];
        }
        if (numbers[2] = "times") {
            var times = function (x2, y2) { return x2 * y2; };
            var array3 = [times];
            return [times];
        }
        if (numbers[3] = "divide") {
            var divide = function (x3, y3) { return x3 * y3; };
            var array4 = [divide];
            return [divide];
        }
    }
    return [];
}
exports.arrayOfArithmeticFunctions = arrayOfArithmeticFunctions;
//const fnArr = arrayOfArithmeticFunctions(["times", "minus", "times"])
//console.log(fnArr[0](1,2))
/* ----------------------------------------------------- **
### Problem 1c

Imagine you're implementing some code that responds to user input.

When the user gives you
1. `undefined` you will call the `onUndefined` function
2. the string `"hello"` you will call the `onHelloString` function
3. any string `str` you will call the `onAnyString` function with that string as input
4. any object `obj` you will call the `onObject` function with that object as input

Write a function that takes in the 4 functions `onUndefined`,
`onHelloString`, `onAnyString`, and `onObject`, and produces a function
that responds to user input. This function can be called anytime that
the user supplies input and is an example of a function callback
that can be used in an event-loop.
** ----------------------------------------------------- */
function registerCallbacks(onUndefined, onHelloString, onAnyString, onObject) {
    // TODO: implement me
    var input1 = function (userInput) { return 1; };
    var input2 = function (userInput) { return 2; };
    var input3 = function (userInput) { return 3; };
    var input4 = function (userInput) { return 4; };
    function myOnDefined() {
        return 1;
    }
    function myOnHelloString() {
        return 2;
    }
    function myOnAnyString() {
        return 3;
    }
    function myOnObject() {
        return 4;
    }
    return input1;
}
exports.registerCallbacks = registerCallbacks;
/* ==========================================================================  **
## Problem 2: Closures and Objects

** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 2a

We saw in class how we could encode classes with closures.
Encode the following class below using closures.
** ----------------------------------------------------- */
var UnsafePair = /** @class */ (function () {
    function UnsafePair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    return UnsafePair;
}());
function CUnsafePair(fst, snd) {
    // TODO: implement me
    //throw Error("TODO");
    return { fst: fst, snd: snd };
}
exports.CUnsafePair = CUnsafePair;
/* ----------------------------------------------------- **
### Problem 2b

One of the benefits of using classes is that we can hide data
from the users of the class. Encode the following class below
using closures.

** ----------------------------------------------------- */
var BetterPair = /** @class */ (function () {
    function BetterPair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    BetterPair.prototype.getFst = function () {
        return this.fst;
    };
    BetterPair.prototype.getSnd = function () {
        return this.snd;
    };
    return BetterPair;
}());
function CBetterPair(fst, snd) {
    // TODO: implement me
    //throw Error("TODO");
    //return new BetterPair(fst,snd);
    function _getFst() {
        return fst;
    }
    function _getSnd() {
        return snd;
    }
    return {
        getFst: _getFst,
        getSnd: _getSnd
    };
}
exports.CBetterPair = CBetterPair;
/* ----------------------------------------------------- **
### Problem 2c

Suppose we want to expose a method `setSnd` that allows us to
change the value of the second element of the pair. Encode
the following the class using closures.
** ----------------------------------------------------- */
var Pair = /** @class */ (function () {
    function Pair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    Pair.prototype.getFst = function () {
        return this.fst;
    };
    Pair.prototype.getSnd = function () {
        return this.snd;
    };
    Pair.prototype.setSnd = function (snd) {
        this.snd = snd;
    };
    return Pair;
}());
function CPair(fst, snd) {
    // TODO: implement me
    //throw Error("TODO");
    //const pair = CPair(fst,snd)
    //pair.setSnd = pair.getSnd
    //return pair;
    //return new Pair(fst,snd)
    function _getFst() {
        return fst;
    }
    function _getSnd() {
        return snd;
    }
    function _setSnd(snd) {
        return snd;
    }
    return {
        getFst: _getFst,
        getSnd: _getSnd,
        setSnd: _getSnd
    };
}
exports.CPair = CPair;
exports.jsonLinkExample = [
    {
        "authority": "one.com",
        "path": "1",
        "links": [
            {
                "authority": "www.two.com",
                "links": []
            },
            {
                "authority": "three.com",
                "path": "",
                "links": []
            }
        ]
    },
    {
        "authority": "www.four.com",
        "links": [
            {
                "authority": "seven.com",
                "links": [
                    {
                        "authority": "app.one.com",
                        "path": "2",
                        "links": [
                            {
                                "authority": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ]
            },
            {
                "authority": "app.three.com",
                "path": "locations/42",
                "links": []
            }
        ]
    }
];
/* ----------------------------------------------------- **
### Problem 3a

Write a **pure** and **recursive** function using any of
map/filter/reduce to construct an array of all the paths (duplicates
included) associated with an authority satisfying a predicate in
a JSONObject. If that JSONObject does not have a path, use "/".

It may be instructive to compare and contrast your solution
to this problem with problem 4a from HW1.
** ----------------------------------------------------- */
function allPathsSatisfyingPredicate(predicate, json) {
    //export function allPathsSatisfyingPredicate(json: JSONValue): string[] {
    var links = [];
    if (Array.isArray(json)) {
        for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
            var entry = json_1[_i];
            links = links.concat(allPathsSatisfyingPredicate(predicate, entry));
        }
    }
    else if (json !== null && typeof json !== "string") {
        var authority = json.authority;
        if (typeof authority === "string") {
            links.push(authority);
        }
        var sublinks = json.links;
        if (sublinks !== undefined) {
            links = links.concat(allPathsSatisfyingPredicate(predicate, sublinks));
        }
    }
    return links;
}
exports.allPathsSatisfyingPredicate = allPathsSatisfyingPredicate;
//console.log(jsonLinkExample[0])
//console.log(allPathsSatisfyingPredicate("True",jsonLinkExample))
/* ----------------------------------------------------- **
### Problem 3b

Write a **pure** function using your solution to 3a and any of
map/filter/reduce to construct the number of paths with at
least 2 /'s.

It may be instructive to compare and contrast your solution
to this problem with problem 4b from HW1.
** ----------------------------------------------------- */
function countPathsSatisfyingPredicate(predicate, json) {
    // TODO: implement me
    var links = [];
    var count = 0;
    if (Array.isArray(json)) {
        for (var _i = 0, json_2 = json; _i < json_2.length; _i++) {
            var entry = json_2[_i];
            links = links.concat(countPathsSatisfyingPredicate(predicate, entry));
            count++;
        }
    }
    else if (json !== null && typeof json !== "string") {
        var authority = json.authority;
        if (typeof authority === "string") {
            links.push(authority);
            count++;
        }
        var sublinks = json.links;
        if (sublinks !== undefined) {
            links = links.concat(countPathsSatisfyingPredicate(predicate, sublinks));
            count++;
        }
    }
    return count;
}
exports.countPathsSatisfyingPredicate = countPathsSatisfyingPredicate;
/* ----------------------------------------------------- **
### Problem 3c

Use your solution to 3a and 3b to implement **pure** functions
`allPaths` and `countPaths` for an exact match of an authority.
** ----------------------------------------------------- */
function allPaths(authority, json) {
    // TODO: implement me
    if (json === null) {
        // know json is null
        return [];
    }
    else if (typeof json === "string") {
        // know json is string
        return [];
    }
    else if (Array.isArray(json)) {
        // know json is array with type JSONValue[]
        var acc = [];
        for (var _i = 0, json_3 = json; _i < json_3.length; _i++) {
            var jsonVal = json_3[_i];
            acc = acc.concat(allPaths(authority, jsonVal));
        }
        return acc;
    }
    else {
        // know json is { [key: string]: JSONValue }
        var jsonObj = json;
        return [jsonObj.url].concat(allPaths(authority, jsonObj.links));
    }
    //return [];
}
exports.allPaths = allPaths;
function countPaths(authority, json) {
    // TODO: implement me
    var count = 0;
    if (Array.isArray(json)) {
        for (var _i = 0, json_4 = json; _i < json_4.length; _i++) {
            var entry = json_4[_i];
            count += countPaths(authority, entry);
        }
    }
    else if (json !== null && typeof json !== "string") {
        if (json.authority === authority) {
            count += 1;
        }
        var sublinks = json.links;
        if (sublinks !== undefined) {
            count += countPaths(authority, sublinks);
        }
    }
    return count;
}
exports.countPaths = countPaths;
/* ----------------------------------------------------- **
### Problem 3d

The JSON that we've been working with sometimes is missing path
links. Write a **pure** and **recursive** function along with any
of map/filter/reduce to add a path field with a value of "/" to
any JSON entry that is missing one.
** ----------------------------------------------------- */
function fillInMissingPath(json) {
    // TODO: implement me
    if (json === null) {
        // know json is null
        return []; // [];
    }
    else if (typeof json === "string") {
        // know json is string
        return []; // [];
    }
    return "TODO";
}
exports.fillInMissingPath = fillInMissingPath;
function MLeaf(contents, hashValue) {
    // Construct a Merkle Tree MLEAF.
    return {
        tag: "LEAF",
        contents: contents,
        hashValue: hashValue
    };
}
exports.MLeaf = MLeaf;
function MNode(hashValue, left, right) {
    // Construct a Merkle Tree MNODE.
    return {
        tag: "NODE",
        hashValue: hashValue,
        left: left,
        right: right
    };
}
exports.MNode = MNode;
// Note that we don't have LeafNode anymore.
/* ----------------------------------------------------- **
### Problem 4a

Write a **pure** function that converts an array of data into a
Merkle Tree where all `hashValue`s are 0.


Example 1:

    Input:
        ["csc600"];
            d

    Output:
        MLeaf(d, 0) =
            0
            |
            *
            d


Example 2:

    Input:
        ["csc600", "is"];
            d1      d2

    Output:
        MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)) =
                       0
                      / \
                     /   \
                    0     0
                    |     |
                    *     *
                    d1    d2


Example 3:

    Input:
        ["csc600", "is", "hard"];
            d1      d2     d3

    Output:
        MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0)) =
                            0
                        /       \
                       /         \
                      0           0
                     / \         /  \
                    /   \       /    \
                   0     0      0    0
                   |     |      |    |
                   *     *      *    *
                  d1   d2     d3   undefined

That is, put "half" of the data on the left and "half" of the data
on the right. If there is an odd number of data, put the extra data
on the left side.
** ----------------------------------------------------- */
function arrayToMerkleTree(arr) {
    // TODO: implement me
    //return MLeaf(undefined, 0);
    if (arr.length == 0) {
        return MLeaf(undefined, 0);
    }
    else if (arr.length == 1) {
        return MLeaf(arr[0], 0);
    }
    else if (arr.length == 2) {
        return MNode(0, MLeaf(arr[0], 0), MLeaf(arr[1], 0));
    }
    else if (arr.length == 3) {
        return MNode(0, MNode(0, MLeaf(arr[0], 0), MLeaf(arr[1], 0)), MNode(0, MLeaf(arr[2], 0), MLeaf(undefined, 0)));
    }
    else {
        if (arr.length % 2 == 0) {
            var midpt = Math.trunc(arr.length / 2);
            return MNode(0, arrayToMerkleTree(arr.slice(0, midpt)), arrayToMerkleTree(arr.slice(midpt, arr.length)));
        }
        else {
            var midpt = Math.trunc(arr.length / 2);
            return MNode(0, arrayToMerkleTree(arr.slice(0, midpt + 1)), arrayToMerkleTree(arr.slice(midpt + 1, arr.length)));
        }
    }
}
exports.arrayToMerkleTree = arrayToMerkleTree;
/* ----------------------------------------------------- **
### Problem 4b

Suppose we have Merkle Trees where all intermediate nodes have
hash values of 0 to start.

Example 1: MLeaf(d, 0) =
    0
    |
    *
    d

Example 2: MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)) =

     0
    / \
   /   \
  0     0
  |     |
  *     *
  d1   d2

Example 3: MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0)) =

           0
        /    \
       /      \
      0         0
     / \       / \
    /   \     /   \
   0     0   0    0
   |     |   |    |
   *     *   *    *
   d1   d2   d3  undefined

In this problem, we will implement the "Merkle" Tree part by
propagating the hash values from the leaf nodes all the way up
to the root node.

Example 1:
    
    hashFromLeafToRoot(e, h, MLeaf(d, 0))) =
           e(d)
            |
            *
            d

Example 2:

    hashFromLeafToRoot(e, h, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0))) =

         h(d1 + d2)
            / \
           /   \
        e(d1)  e(d2)
          |     |
          *     *
          d1   d2

Example 3:

    hashFromLeafToRoot(e, h, MNode(0, MNode(0, MLeaf(d1, 0), MLeaf(d2, 0)), MLeaf(d3, 0))) =

            h(h(e(d1) + e(d2)) + h(e(d3) + 42))
                 /              \
                /                \
            h(e(d1) + e(d2))  h(e(d3) + 42)   (use 42 when undefined)
               / \                /  \
              /   \              /    \
            e(d1)  e(d2)        e(d3)  42
              |     |             |    |
              *     *             *    *
             d1    d2             d3   undefined


A hash function is a one-way function, meaning that it is easy to
compute but difficult to invert. The root of the Merkle Tree will
thus contain a hash value that is easy to compute but difficult to
invert. The consequence is this: if any of the data in the MLeaf
nodes are corrupted, we can easily detect this by compute the hash
of the entire tree and comparing it with the number recorded in the
tree.

When writing `hashFromLeafToRoot`
1. use 42 when the MLeaf node is undefined
2. add the hash values of the left and right child, and then hash
   that value to compute the hash of a MNode.
`hashFromLeafToRoot` should only use **pure** functions.

** ----------------------------------------------------- */
function hashFromLeafToRoot(hashData, hash, mtr) {
    // TODO: implement me
    var tempTree = mtr;
    var a = hash(mtr.hashValue);
    switch (mtr.tag) {
        case "LEAF": {
            return MLeaf(mtr.contents, 42);
        }
        case "NODE": {
            //let smallest = mtr.hashValue;
            if (mtr.left.tag != "LEAF") {
                //mtr.hashValue = hashFromLeafToRoot(hashData,hash,mtr.left)
                //smallest = Math.min(smallest, hashFromLeafToRoot(hashData,hash,mtr.left));
            }
            if (mtr.right.tag != "LEAF") {
                //smallest = Math.min(smallest, hashFromLeafToRoot());
            }
            //return smallest;
        }
    }
    return mtr;
}
exports.hashFromLeafToRoot = hashFromLeafToRoot;
/* ----------------------------------------------------- **
### Problem 4c

Write a **pure** `checkMerkleTreeHash` function that checks that the
data in a Merkle Tree has not been corrupted. Return true if
the Merkle Tree has not been corrupted and false if the
MerkleTree has been corrupted.  Your code should guarantee that
the Merkle Tree passed in `mtr` is not mutated.

** ----------------------------------------------------- */
function checkMerkleTreeHash(hashData, hash, mtr) {
    // TODO: implement me
    if (mtr.hashValue = hash(mtr.hashValue)) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkMerkleTreeHash = checkMerkleTreeHash;
/* ----------------------------------------------------- **
### Problem 4d

We might want more flexibility in how we hash.

1. For example, instead of always using 42 when a node is undefined,
   we might want to use a random number instead.
2. Instead of x + y, we may want to use combine(x, y)
   for some arbitrary combine function.

Generalize the function from problem 4b with the two features above. The
function you write must be a **pure** function.

You can generate random numbers by using **seed** and **random** as:
let [v1, seed1] = random(seed);    // v1 is the random number, seed1 is the new seed
let [v2, seed2] = random(seed1);   // v2 is the random number, seed2 is the new seed
let [v3, seed3] = random(seed2);   // v3 is the random number, seed3 is the new seed

The function `random` is a deterministic function of the input number
`seed`. Thus, when traversing the tree, we need to define an order
in which we are traversing the tree to ensure that we generate the same
sequence of random numbers by using the appropriate seed values. For this problem,
traverse the tree in mirrored postorder: right, left, and then the current node.
That is, the seed value used for the right child is the current value of `seed`, the
seed value for the left child is the one obtained after visting all the nodes in the
right child, and the seed value value used for the current node is the one obtained
after visiting all the nodes in the left child. Only generate a random number when
you encounter an undefined value.

** ----------------------------------------------------- */
function betterHashFromLeafToRoot(hashData, hash, random, seed, combine, mtr) {
    // TODO: implement me
    var _a = random(seed), v1 = _a[0], seed1 = _a[1];
    var _b = random(seed1), v2 = _b[0], seed2 = _b[1];
    var _c = random(seed2), v3 = _c[0], seed3 = _c[1];
    switch (mtr.tag) {
        case "LEAF": {
            return MLeaf(mtr.contents, v3);
        }
        case "NODE": {
            //let smallest = mtr.hashValue;
            if (mtr.left.tag != "LEAF") {
                //mtr.hashValue = hashFromLeafToRoot(hashData,hash,mtr.left)
                //smallest = Math.min(smallest, hashFromLeafToRoot(hashData,hash,mtr.left));
            }
            if (mtr.right.tag != "LEAF") {
                //smallest = Math.min(smallest, hashFromLeafToRoot());
            }
            //return smallest;
        }
    }
    return mtr;
    return MLeaf(undefined, 0);
}
exports.betterHashFromLeafToRoot = betterHashFromLeafToRoot;
/* ----------------------------------------------------- **
### Problem 4 Summary

This ends problem 4. Hopefully, you got a more concrete sense of
a non-trivial tree structure and how recursive functions +
first-class functions could be used to do interesting computations.
** ----------------------------------------------------- */
