"use strict";
/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
exports.__esModule = true;
exports.iterCountURL = exports.recCountURL = exports.allURL = exports.jsonLinkExample = exports.hybrid2 = exports.hybrid1 = exports.TwoChild = exports.OneChild = exports.HLeaf = exports._Hybrid = exports.smallestTree = exports.arrayToTree = exports.listToArr = exports.mirroredPostfix = exports.LeafNode = exports.Node = exports.Leaf = exports._Tree = exports.Cons = exports.Nil = exports._List = exports.diffTest2 = exports.diffTest1 = exports.differentialTest = exports.test2 = exports.test1 = exports.recSumOfSquare = exports.iterSumOfSquare = exports.RESOURCES_CONSULTED = exports.COLLABORATORS = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
exports.HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
exports.SIGNATURE = "Zachary Ma"; // TODO: FILL ME IN
// If you had any collaborators on this assignment, please list their github handles here.
exports.COLLABORATORS = [
    "github handle of collaborator 1", // TODO: FILL ME IN
];
// If you used any resources, please list them here
exports.RESOURCES_CONSULTED = [
    "https://replit.com/languages/javascript (nodescript complier), https://www.typescriptlang.org/play (typescripe stuff) ", // TODO: FILL ME IN
];
/* ==========================================================================  **
## Problem 1: Numbers

This problem is a warmup. Consider the following sequence of numbers

S_1 = 1*1
S_n = n*n + S_{n-1}

which is a sum of squares. For example,

S_2 = 2*2 + S_1
    = 2*2 + 1*1

and

S_3 = 3*3 + S_2
    = 3*3 + (2*2 + S_1)
    = 3*3 + (2*2 + 1*1).

S_n = 0 for any n <= 0.
You may assume that all numbers are integers.
** ============================================================================ */
/* ----------------------------------------------------- **
## Problem 1a:

Write sum of squares **iteratively**.
** ----------------------------------------------------- */
function iterSumOfSquare(n) {
    // TODO: implement me
    var sum = 0;
    for (var current_Num = 1; current_Num <= n; current_Num++) {
        sum = sum + (current_Num * current_Num);
    }
    return sum;
}
exports.iterSumOfSquare = iterSumOfSquare;
/* ----------------------------------------------------- **
## Problem 1b:

Write sum of squares **recursively**.
** ----------------------------------------------------- */
function recSumOfSquare(n) {
    // TODO: implement me
    if (n == 0) {
        return 0;
    }
    else {
        return n * n + recSumOfSquare(n - 1);
    }
}
exports.recSumOfSquare = recSumOfSquare;
/* ----------------------------------------------------- **
## Problem 1c:

Write down two test cases.
** ----------------------------------------------------- */
exports.test1 = [2, 2]; // [n1, sumOfSquare(n1)] TODO: change me
console.log(iterSumOfSquare(exports.test1[0]), recSumOfSquare(exports.test1[1]));
exports.test2 = [3, 3]; // [n2, sumOfSquare(n2)] TODO: change me
console.log(iterSumOfSquare(exports.test2[0]), recSumOfSquare(exports.test2[1]));
/* ----------------------------------------------------- **
## Problem 1d:

You now have two implementations of the "same" function.
One way to check the correctness of either implementation is
to perform differential testing where you only need to know
the input and check that the outputs are the same. Note that
the function could still be wrong ... both functions could be
implemented incorrectly in the same way. However, this will
reduce the probability that there is a bug because if the two
functions are implemented incorrectly, it is more likely that
they "incorrect" in different ways.

Write down two more inputs.
** ----------------------------------------------------- */
function differentialTest(n) {
    var result = iterSumOfSquare(n) === recSumOfSquare(n);
    if (!result) {
        console.log("iterSumOfSquare(" + n + ") = " + iterSumOfSquare(n) + " != recSumOfSquare(" + n + ") = " + recSumOfSquare(n));
    }
    return result;
}
exports.differentialTest = differentialTest;
exports.diffTest1 = 5; // n1, TODO: change me
exports.diffTest2 = 7; // n2, TODO: change me
differentialTest(exports.diffTest1);
differentialTest(exports.diffTest2);
/* ==========================================================================  **
## Problem 2: Lists and Trees

In class, we introduced lists and trees as examples of ADTs. In this problem,
we'll look at converting between lists and trees.
** ============================================================================ */
var _List;
(function (_List) {
    _List[_List["NIL"] = 0] = "NIL";
    _List[_List["CONS"] = 1] = "CONS";
})(_List = exports._List || (exports._List = {}));
;
function Nil() {
    return { tag: _List.NIL };
}
exports.Nil = Nil;
function Cons(x, ls) {
    return { tag: _List.CONS, contents: x, rest: ls };
}
exports.Cons = Cons;
var _Tree;
(function (_Tree) {
    _Tree[_Tree["LEAF"] = 0] = "LEAF";
    _Tree[_Tree["NODE"] = 1] = "NODE";
})(_Tree = exports._Tree || (exports._Tree = {}));
;
function Leaf() {
    return { tag: _Tree.LEAF };
}
exports.Leaf = Leaf;
function Node(x, left, right) {
    return { tag: _Tree.NODE, contents: x, left: left, right: right };
}
exports.Node = Node;
function LeafNode(x) {
    return Node(x, Leaf(), Leaf());
}
exports.LeafNode = LeafNode;
/* ----------------------------------------------------- **
### Problem 2a:

Convert a tree into a list using "mirrored" postfix ordering.
That is, we'll visit the right child, the left child, and then
finally the current node. (In standard postfix, we'll visit the
left, the right, and then the current node.)


- Example 1:

Original
```
   1
  / \
 2   3
```

Postfix
```
2 -> 3 -> 1
```

Mirrored Postfix
```
3 -> 2 -> 1
```

- Example 2:

Original
```
   1
  / \
 2   3
 |  / \
 4  5  6
```

Postfix
```
4 -> 2 -> 5 -> 6 -> 3 -> 1
```

Mirrored Postfix
```
6 -> 5 -> 3 -> 4 -> 2 -> 1
```
** ----------------------------------------------------- */
function mirroredPostfix(t) {
    // TODO: Implement me
    if (t.tag === null) {
        return Nil();
    }
    else {
        return Nil();
        // insert code that visits right child, then left child
    }
}
exports.mirroredPostfix = mirroredPostfix;
/* ----------------------------------------------------- **
### Problem 2b:

Previously we converted a tree into a list. Now we will convert a list into an array.

Example 1:

List
```
1 -> 2 -> 3 -> 4
```

Array
```
[1, 2, 3, 4]
```
** ----------------------------------------------------- */
function listToArr(ls) {
    var return_array = [];
    switch (ls.tag) {
        case _List.NIL: {
            //
            return [];
        }
        case _List.CONS: {
            //console.log(ls.contents);
            listToArr(ls.rest);
            var temp_value = (ls.contents);
            return_array.push(temp_value);
            console.log(return_array);
            break;
        }
    }
    //console.log("exit");
    return [];
}
exports.listToArr = listToArr;
/* ----------------------------------------------------- **
### Problem 2c:

In this problem we'll convert an array into a tree.

- Example 1:

Array
```
[1, 2, 3]
```

Tree
```
    2
   / \
  1   3
```

- Example 2:

Array
```
[1, 2, 3, 4]
```

Tree
```
    3
   / \
  2   4
 /
1
```

- Example 3:

Array
```
[1, 2, 3, 4, 5]
```

Tree
```
    3
   / \
  2   5
 /   /
1    4
```

- Example 4:

Array
```
[1, 2, 3, 4, 5, 6]
```

Tree
```
     4
    / \
   /   \
  2     6
 / \    /
1   3  5
```
** ----------------------------------------------------- */
// Hint: use recursion with arr.slice 
function arrayToTree(arr) {
    //currently exists for a
    var root = arr[0];
    var length = arr.length;
    console.log(length);
    if (root == null) {
        return Leaf();
    }
    else {
        var left = LeafNode(arr[1]);
        var left2 = [arr[1]];
        var right2 = [arr[2]];
        arrayToTree(left2);
        arrayToTree(right2);
        var right = LeafNode(arr[2]);
        return Node(root, arrayToTree(left2), arrayToTree(right2));
    }
}
exports.arrayToTree = arrayToTree;
/* ----------------------------------------------------- **
### Problem 2d:

In summary, we saw we could convert trees into lists, lists into
arrays, and arrays back into trees. Consequently, an algorithm on
trees can be applied to arrays. For example, in class, we saw
that we could compute the smallest element in an array iteratively
and recursively.

Write a **recursive** function that finds the smallest element in a
tree of numbers. If it is an empty Tree, return NaN. We can then
find the smallest number in a tree using this  implementation as in
```
function smallestElementArr2(arr: number[]): number {
    return smallestTree(arrayToTree(arr));
}
```
```
** ----------------------------------------------------- */
function smallestTree(tr) {
    // TODO: Implement me
    // Takes a tree, and checks if it exists, else it has it go from tree to list to array.
    // Takes value from array and finds smallest value, returns value.
    var value = [];
    if (tr.tag === null) {
        return NaN;
    }
    else {
        value = smallestElementArr2(listToArr(mirroredPostfix(tr)));
        return value;
    }
    function smallestElementArr2(arr2) {
        if (arr2.length == 1) {
            return arr2[0];
        }
        else if (arr2[0] > arr2[1]) {
            return smallestElementArr2(arr2.slice(1));
        }
        else {
            return smallestElementArr2([arr2[0]].concat(arr2.slice(2)));
        }
    }
}
exports.smallestTree = smallestTree;
/* ==========================================================================  **
## Problem 3: Hybrid List and Tree

We saw lists and binary trees in class. If the problem we are working on is a list
or tree, then we can reuse generic list and tree data-types. However, the problem
at hand may not be exactly a list or tree, in which case we will need to define our
own data-types. In this problem, we will practice defining our own data-types. We
will look at hybrid lists and trees where a tree can have one or two children. We
give the BNF below.

<hybrid> ::= HLeaf | OneChild(x, <hybrid>) | TwoChild(x, <hybrid>, <hybrid>)
** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 3a:

Complete the data-type definition below.
** ----------------------------------------------------- */
var _Hybrid;
(function (_Hybrid) {
    _Hybrid[_Hybrid["HLEAF"] = 0] = "HLEAF";
    _Hybrid[_Hybrid["ONECHILD"] = 1] = "ONECHILD";
    _Hybrid[_Hybrid["TWOCHILD"] = 2] = "TWOCHILD";
})(_Hybrid = exports._Hybrid || (exports._Hybrid = {}));
;
function HLeaf() {
    return { tag: _Hybrid.HLEAF }; // This one is completed/
}
exports.HLeaf = HLeaf;
function OneChild(x, child) {
    // TODO: implement me
    return { tag: _Hybrid.ONECHILD, content: x, child: child };
}
exports.OneChild = OneChild;
function TwoChild(x, left, right) {
    // TODO: implement me
    return { tag: _Hybrid.TWOCHILD, content: x, left: left, right: right };
}
exports.TwoChild = TwoChild;
/* ----------------------------------------------------- **
### Problem 3b:

Implement the following two structures in the `Hybrid` ADT.

hybrid1
```
    3
   / \
  2   5
  |   |
  1   4
```

hybrid2
```
     4
    / \
   /   \
  2     6
 / \    |
1   3   5

Use OneChild for LeafNodes.
```
** ----------------------------------------------------- */
exports.hybrid1 = TwoChild("3", OneChild("2", OneChild("1", HLeaf())), OneChild("5", OneChild("4", HLeaf()))); // TODO: implement me
exports.hybrid2 = TwoChild("4", TwoChild("2", OneChild("1", HLeaf()), OneChild("3", HLeaf())), OneChild("6", OneChild("5", HLeaf()))); // TODO: implement me
/* ----------------------------------------------------- **
### Problem 3c

You may have noticed that the Hybrid ADT was able to encode
the "same" structures as Tree data structure. That the "same"
data can be stored in a variety of equivalent encodings can
occur in practice.

Write a **recursive** function that converts a Hybrid data
structure into a Tree structure. When translating a node with
one child into a node, put the child in the left child.
** ----------------------------------------------------- */
function hybridToTree(hybrid) {
    // TODO: implement me
    return HLeaf();
}
exports.jsonLinkExample = [
    {
        "url": "one.com",
        "links": [
            {
                "url": "two.com",
                "links": []
            },
            {
                "url": "three.com",
                "links": []
            }
        ]
    },
    {
        "url": "four.com",
        "links": [
            {
                "url": "seven.com",
                "links": [
                    {
                        "url": "one.com",
                        "links": [
                            {
                                "url": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ]
            },
            {
                "url": "three.com",
                "links": []
            }
        ]
    }
];
/* ----------------------------------------------------- **
### Problem 4a

Write a **recursive** function that creates an array of all
URLs (duplicates included) found in the JSON.
** ----------------------------------------------------- */
function allURL(json) {
    if (json === null) {
        console.log("null");
        //array.push("null")
    }
    else if (typeof json === "string") {
        console.log("string");
    }
    //console.log("test")
    //else if ()
    return [];
}
exports.allURL = allURL;
/* ----------------------------------------------------- **
### Problem 4b

Given a JSON as above where "links" contains the same JSON
format, arbitrarily nested, write a **recursive** function
that counts the number of times an exact match of a given url
occurs in the JSON object.
** ----------------------------------------------------- */
function recCountURL(url, json) {
    // TODO: Implement me
    var count = 0;
    if (json === null) {
        console.log("null");
        return 0;
    }
    else if (typeof json === "string") {
        var hasMatch = false;
        for (var i = 0; i < json.length; i++) {
            var word = json[i];
            if (url == "url") {
                hasMatch = true;
                break;
            }
        }
    }
    return 0;
}
exports.recCountURL = recCountURL;
/* ----------------------------------------------------- **
### Problem 4c

Do the same as problem 4a but this time with an **iterative**
function.
** ----------------------------------------------------- */
function iterCountURL(url, json) {
    // TODO: Implement me
    var count = 0;
    if (json === null) {
        console.log("null");
        return 0;
    }
    else if (typeof json === "string") {
        var hasMatch = false;
        for (var i = 0; i < json.length; i++) {
            var word = json[i];
            if (url == "url") {
                hasMatch = true;
                break;
            }
        }
    }
    return 0;
}
exports.iterCountURL = iterCountURL;
