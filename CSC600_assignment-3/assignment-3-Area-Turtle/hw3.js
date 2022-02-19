"use strict";
/* ==========================================================================  **
## HW3 Instructions

See this Google doc for clarifications to this homework:

https://docs.google.com/document/d/1HiOEaGOq7pA5OMz4rCmp_ztxRo8GKZex3SigZVV56PY/edit?usp=sharing

** ==========================================================================  **

1. Push your solution, contained entirely in hw3.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw3.ts
   ```
   to produce a file `hw3.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw3.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.jsonLinkExample2 = exports.WebEntryPathJSONValue = exports.WebEntryJSONValue = exports.jsonLinkExample = exports.ObjJSONValue = exports.ArrJSONValue = exports.StringJSONValue = exports.Tree3 = exports.Tree = exports.newStrangeNumber2 = exports.StrangeNumber2Class = exports.newStrangeNumber = exports.StrangeNumberClass = exports.RESOURCES_CONSULTED = exports.COLLABORATORS = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
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
## 1. In this problem, we will look at dynamic dispatch and inheritance.

Your task is to translate a class into code without classes. In doing so, we
hope you get a better sense of how dynamic dispatch and inheritance work
"underneath-the-hood".
** ============================================================================ */
/* ----------------------------------------------------- **
### 1a. Translate StrangeNumberClass into a closure.

Example:

Class behavior

    const c1 = new StrangeNumberClass()
    > [c1.isEven(2), c1.count]
    [true, 9]
    > [c1.isOdd(4), c1.count]
    [false, 48]
    > [c1.isEven(-10), c1.count]
    [true, 3228]


Your functional code should behave the same way

    const f1 = newStrangeNumber()
    > [f1.isEven(2), f1.count]
    [true, 9]
    > [f1.isOdd(4), f1.count]
    [false, 48]
    > [f1.isEven(-10), f1.count]
    [true, 3228]

** ----------------------------------------------------- */
var StrangeNumberClass = /** @class */ (function () {
    function StrangeNumberClass() {
        this.count = 1;
    }
    StrangeNumberClass.prototype.isEven = function (n) {
        if (n < 0) {
            this.count = this.count * 2 + 1;
            return !this.isOdd(-n);
        }
        else if (n === 0) {
            return true;
        }
        else {
            this.count += 3;
            return this.isOdd(n - 1);
        }
    };
    StrangeNumberClass.prototype.isOdd = function (n) {
        if (n < 0) {
            this.count += 3;
            return !this.isEven(-n);
        }
        else if (n === 0) {
            return false;
        }
        else {
            this.count = this.count * 2 + 1;
            return this.isEven(n - 1);
        }
    };
    return StrangeNumberClass;
}());
exports.StrangeNumberClass = StrangeNumberClass;
function newStrangeNumber() {
    // TODO: Implement me
    //throw Error("TODO");
    var num = new StrangeNumberClass();
    var mycount = num.count;
    function isEven(n) {
        if (n < 0) {
            mycount = mycount * 2 + 1;
            return !num.isOdd(-n);
        }
        else if (n === 0) {
            return true;
        }
        else {
            mycount += 3;
            return num.isOdd(n - 1);
        }
    }
    function isOdd(n) {
        if (n < 0) {
            mycount += 3;
            return !num.isEven(-n);
        }
        else if (n === 0) {
            return false;
        }
        else {
            mycount = num.count * 2 + 1;
            return num.isEven(n - 1);
        }
    }
    //const
    return {
        count: mycount,
        isEven: (function (mycount) { return isEven(mycount); }),
        isOdd: (function (mycount) { return isOdd(mycount); })
    };
}
exports.newStrangeNumber = newStrangeNumber;
/* ----------------------------------------------------- **
### 1b. Complete the definition of newStrangeNumber2 below.

Example:

Class behavior

    const c1 = new StrangeNumber2Class()
    > [c1.isEven(2), c1.count]
    [true, 5]
    > [c1.isOdd(4), c1.count]
    [false, 6]
    > [c1.isEven(-10), c1.count]
    [true, 14]

Your functional code should behave the same way

    const f1 = newStrangeNumber2()
    > [f1.isEven(2), f1.count]
    [true, 5]
    > [f1.isOdd(4), f1.count]
    [false, 6]
    > [f1.isEven(-10), f1.count]
    [true, 14]

** ----------------------------------------------------- */
var StrangeNumber2Class = /** @class */ (function (_super) {
    __extends(StrangeNumber2Class, _super);
    function StrangeNumber2Class() {
        return _super.call(this) || this;
    }
    StrangeNumber2Class.prototype.isOdd = function (n) {
        if (n <= 0) {
            return !this.isEven(-n);
        }
        else {
            this.count += 1;
            return n % 2 === 1;
        }
    };
    return StrangeNumber2Class;
}(StrangeNumberClass));
exports.StrangeNumber2Class = StrangeNumber2Class;
function newStrangeNumber2() {
    // TODO: implement me
    //throw Error("TODO");
    var num = new StrangeNumberClass();
    var mycount = num.count;
    function isEven(n) {
        if (n < 0) {
            mycount = mycount * 2 + 1;
            return !num.isOdd(-n);
        }
        else if (n === 0) {
            return true;
        }
        else {
            mycount += 3;
            return num.isOdd(n - 1);
        }
    }
    function isOdd(n) {
        if (n <= 0) {
            return !num.isEven(-n);
        }
        else {
            num.count += 1;
            return n % 2 === 1;
        }
    }
    return {
        count: mycount,
        isEven: (function (mycount) { return isEven(mycount); }),
        isOdd: (function (mycount) { return isOdd(mycount); })
    };
}
exports.newStrangeNumber2 = newStrangeNumber2;
/* ==========================================================================  **
## 2. Your favorite algebraic data type is back as a class.

Recall the Tree algebraic data type and three ways to build a Tree.
```
type Tree<T> =
    { tag: "LEAF" }
  | { tag: "NODE", contents: T, left: Tree<T>, right: Tree<T> };

function Leaf<T>(): Tree<T> {
    return { tag: "LEAF" };
}

function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return { tag: "NODE", contents: x, left: left, right: right };
}

function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}
```

In this problem, we will revisit some of it using classes and objects.
** ============================================================================ */
var Tree = /** @class */ (function () {
    /* ----------------------------------------------------- **
    Here are some examples showing how the ADT definition maps to the
    class definition.

    Example 1:
    
    ADT:
        Leaf()

    Class:
        const tr1 = undefined

    Example 2:

    ADT:
        LeafNode(2)

    Class:
        const tr2 = new Tree(2, undefined, undefined)

            2

    Example 3:

    ADT:
        Node(3, LeafNode(2), Leaf())
        
           3
          /
         2

    Class:
        const tr3 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        undefined)

    Example 4:

    ADT:
        Node(3, LeafNode(2), Node(3, LeafNode(4), LeafNode(5)))

            3
          /  \
         2    3
            /  \
           4    5

    Class:
        const tr4 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        new Tree(
                            3,
                            new Tree(4, undefined, undefined),
                            new Tree(5, undefined, undefined)
                            )
                        )
    ** ----------------------------------------------------- */
    function Tree(contents, left, right) {
        this.contents = contents;
        this.left = left;
        this.right = right;
    }
    /* ----------------------------------------------------- **
    ### 2a. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples:

    1. tr2.map((x) => x + 1) =

            3

    2. tr3.map((x) => x * 2) =

            6
           /
          4
    
    3. tr4.map((x) => "1" + x) =

             "13"
            /    \
         "12"    "13"
                /    \
              "14"  "15"
    ** ----------------------------------------------------- */
    Tree.prototype.map = function (f) {
        // TODO: implement me
        //throw Error("TODO");
        var value = this.contents;
        var left = this.left;
        var right = this.right;
        //console.log(this.contents)
        //console.log(this.left)
        //console.log(this.right)
        // let temp = new Tree(this.contents,this.left,this.right)
        if (this.left == undefined) {
            switch (this.left) {
                case undefined: {
                    return new Tree(f(value), undefined, undefined);
                }
                case this.left: {
                    if (this.right == undefined) {
                        return new Tree(f(value), this.left, this.right);
                    }
                }
            }
        }
    };
    return Tree;
}());
exports.Tree = Tree;
//const tr2 = new Tree(2, undefined, undefined)
//const tr3 = new Tree(3,new Tree(2, undefined, undefined),undefined)
//console.log(tr2.map((x) => x + 1))
/* ----------------------------------------------------- **
Suppose we want to create trees that have either 3 children or
2 children. One way to accomplish this is to extend the
original definition of Tree as below.
** ----------------------------------------------------- */
var Tree3 = /** @class */ (function (_super) {
    __extends(Tree3, _super);
    /* ----------------------------------------------------- **
    Example 1:

    const tr1 = new Tree3(2, undefined, undefined, undefined)

         2

    Example 2:
        
        const tr2 = new Tree3(
            3,
            new Tree(2, undefined, undefined),
            new Tree3(1, undefined, undefined, undefined),
            new Tree(4, undefined, undefined),
        )

            3
         /  |  \
        2   1   4

    Example 3:

        const tr3 = new Tree(
            2,
            tr2,
            new Tree2(3, undefined, tr2)
        )

              2
            /   \
           3     3
         / | \    \
        2  1  4    \
                    3
                  / | \
                 2  1  4
    ** ----------------------------------------------------- */
    function Tree3(contents, left, middle, right) {
        var _this = _super.call(this, contents, left, right) || this;
        _this.middle = middle;
        return _this;
    }
    /* ----------------------------------------------------- **
    ### 2b. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples:

    1. tr1.map((x) => x + 1) =

            3

    2. tr2.map((x) => x * 2) =

           6
        /  |  \
       4   2   8
    
    3. tr3.map((x) => "a" + x) =

                "a2"
              /      \
            "a3"     "a3"
          /  |  \      \
      "a2" "a1" "a4"    \
                       "a3"
                      /  |   \
                   "a2" "a1" "a4"
    ** ----------------------------------------------------- */
    Tree3.prototype.map = function (f) {
        // TODO: Implement me
        //throw Error("TODO");
        var value = this.contents;
        var left = this.left;
        var right = this.right;
        //console.log(this.contents)
        //console.log(this.left)
        //console.log(this.right)
        // let temp = new Tree(this.contents,this.left,this.right)
        if (this.left == undefined) {
            switch (this.left) {
                case undefined: {
                    return new Tree(this.contents, undefined, undefined);
                }
                case this.left: {
                    if (this.right == undefined) {
                        return new Tree(f(value), this.left, this.right);
                    }
                }
            }
        }
    };
    /* ----------------------------------------------------- **
    ### 2c. Implement a function that eliminates all middle children
    and produces a tree that only has two children.
    
    Let `curr` be a node with left child `left`, middle child `mid`, and
    right child `right`. If the middle child `mid` is not `undefined`,
    then make the sub-tree rooted at the middle child `mid` the left-most
    sub-tree of the sub-tree `left.toTree2()`. That is, make `mid.toTree2()`
    the left-most sub-tree of the sub-tree `left.toTree2()`.

    Examples:

    1. tr1.toTree2() =

            3

    2. tr2.toTree2() =

           3
         /  \
        1    4
       /
      2
    
    3. tr3.toTree2() =

              2
            /   \
           3     3
         /   \    \
        1     4    \
       /            3
      2           /   \
                 1     4
                /
               2
    ** ----------------------------------------------------- */
    Tree3.prototype.toTree2 = function () {
        // TODO: Implement me
        //throw Error("TODO");
        var value = this.contents;
        var left = this.left;
        var right = this.right;
        //console.log(this.contents)
        //console.log(this.left)
        //console.log(this.right)
        // let temp = new Tree(this.contents,this.left,this.right)
        if (this.left == undefined) {
            switch (this.left) {
                case undefined: {
                    return new Tree(this.contents, undefined, undefined);
                }
                case this.left: {
                    if (this.right == undefined) {
                        return new Tree(this.contents, this.left, this.right);
                    }
                }
            }
        }
    };
    return Tree3;
}(Tree));
exports.Tree3 = Tree3;
/* ----------------------------------------------------- **
### 3a. Implement the StringJSONValue class.
** ----------------------------------------------------- */
var StringJSONValue = /** @class */ (function () {
    function StringJSONValue(str) {
        this.str = str;
    }
    StringJSONValue.prototype.allPathsSatisfyingPredicate = function (predicate) {
        // TODO: Implement me
        //throw Error("TODO");
        return [];
    };
    StringJSONValue.prototype.fillInMissingPath = function () {
        // TODO: Implement me
        //throw Error("TODO");
        return new StringJSONValue(this.str);
    };
    return StringJSONValue;
}());
exports.StringJSONValue = StringJSONValue;
/* ----------------------------------------------------- **
### 3b. Implement the ArrJSONValue class.
** ----------------------------------------------------- */
var ArrJSONValue = /** @class */ (function () {
    function ArrJSONValue(arr) {
        this.arr = arr;
    }
    ArrJSONValue.prototype.allPathsSatisfyingPredicate = function (predicate) {
        var _this = this;
        // TODO: Implement me
        //throw Error("TODO");
        var arr = this.arr;
        return arr.map(function (x) { return _this.allPathsSatisfyingPredicate(predicate); }).reduce(function (acc, x) { return acc.concat(x); });
    };
    ArrJSONValue.prototype.fillInMissingPath = function () {
        // TODO: Implement me
        //throw Error("TODO");
        return new ArrJSONValue(this.arr.map(this.fillInMissingPath));
    };
    return ArrJSONValue;
}());
exports.ArrJSONValue = ArrJSONValue;
/* ----------------------------------------------------- **
### 3c. Implement the ObjJSONValue class.
** ----------------------------------------------------- */
var ObjJSONValue = /** @class */ (function () {
    function ObjJSONValue(obj) {
        this.obj = obj;
    }
    ObjJSONValue.prototype.allPathsSatisfyingPredicate = function (predicate) {
        var _this = this;
        // TODO: Implement me
        //
        var entry = this.obj;
        var acc = [];
        if (predicate(entry.authority)) {
            if ("path" in entry) {
                var pentry = entry;
                acc.push(pentry.path);
            }
            else {
                acc.push("/");
            }
        }
        return acc.concat(entry.links.map(function (x) { return _this.allPathsSatisfyingPredicate(predicate); })
            .reduce(function (acc, x) { return acc.concat(x); }));
        //throw Error("TODO");
    };
    ObjJSONValue.prototype.fillInMissingPath = function () {
        var _a;
        // TODO: Implement me
        //throw Error("TODO");
        var entry = this.obj;
        return new ObjJSONValue({
            authority: entry.authority,
            path: (_a = this.obj.path) !== null && _a !== void 0 ? _a : "/",
            links: entry.links.map(this.fillInMissingPath)
        });
        //throw Error("TODO");
    };
    return ObjJSONValue;
}());
exports.ObjJSONValue = ObjJSONValue;
exports.jsonLinkExample = new ArrJSONValue([
    new ObjJSONValue({
        "authority": new StringJSONValue("one.com"),
        "path": new StringJSONValue("1"),
        "links": new ArrJSONValue([
            new ObjJSONValue({
                "authority": new StringJSONValue("www.two.com"),
                "links": new ArrJSONValue([])
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("three.com"),
                "path": new StringJSONValue(""),
                "links": new ArrJSONValue([])
            })
        ])
    }),
    new ObjJSONValue({
        "authority": new StringJSONValue("www.four.com"),
        "links": new ArrJSONValue([
            new ObjJSONValue({
                "authority": new StringJSONValue("seven.com"),
                "links": new ArrJSONValue([
                    new ObjJSONValue({
                        "authority": new StringJSONValue("app.one.com"),
                        "path": new StringJSONValue("2"),
                        "links": new ArrJSONValue([
                            new ObjJSONValue({
                                "authority": new StringJSONValue("eight.com"),
                                "links": new ArrJSONValue([])
                            })
                        ])
                    })
                ])
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("app.three.com"),
                "path": new StringJSONValue("locations/42"),
                "links": new ArrJSONValue([])
            })
        ])
    })
]);
/* ----------------------------------------------------- **
### 3d. The `ObjJSONValue` class was too general for our web-crawler.
In particular, the objects only contained two kinds of entries
given by the classes `WebEntryJSONValue` and `WebEntryPathJSONValue`
below.

Implement the two classes `WebEntryJSONValue` and `WebEntryPathJSONValue`.
** ----------------------------------------------------- */
var WebEntryJSONValue = /** @class */ (function (_super) {
    __extends(WebEntryJSONValue, _super);
    function WebEntryJSONValue(authority, links) {
        return _super.call(this, {
            authority: new StringJSONValue(authority),
            links: new ArrJSONValue(links.arr)
        }) || this;
    }
    WebEntryJSONValue.prototype.allPathsSatisfyingPredicate = function (predicate) {
        var _this = this;
        // TODO: implement me
        //throw Error("TODO");
        var entry = this.obj;
        var acc = [];
        if (predicate(entry.authority)) {
            if ("path" in entry) {
                var pentry = entry;
                acc.push(pentry.path);
            }
            else {
                acc.push("/");
            }
        }
        return acc.concat(entry.links.map(function (x) { return _this.allPathsSatisfyingPredicate(predicate); })
            .reduce(function (acc, x) { return acc.concat(x); }));
    };
    WebEntryJSONValue.prototype.fillInMissingPath = function () {
        var _a;
        // TODO: implement me
        //throw Error("TODO");
        var entry = this.obj;
        return new WebEntryJSONValue({
            authority: entry.authority,
            path: (_a = this.obj.path) !== null && _a !== void 0 ? _a : "/",
            links: entry.links.map(this.fillInMissingPath)
        });
    };
    return WebEntryJSONValue;
}(ObjJSONValue));
exports.WebEntryJSONValue = WebEntryJSONValue;
var WebEntryPathJSONValue = /** @class */ (function (_super) {
    __extends(WebEntryPathJSONValue, _super);
    function WebEntryPathJSONValue(authority, path, links) {
        return _super.call(this, {
            authority: new StringJSONValue(authority),
            path: new StringJSONValue(path),
            links: new ArrJSONValue(links.arr)
        }) || this;
    }
    WebEntryPathJSONValue.prototype.allPathsSatisfyingPredicate = function (predicate) {
        var _this = this;
        // TODO: implement me
        // throw Error("TODO");
        var entry = this.obj;
        var acc = [];
        if (predicate(entry.authority)) {
            if ("path" in entry) {
                var pentry = entry;
                acc.push(pentry.path);
            }
            else {
                acc.push("/");
            }
        }
        return acc.concat(entry.links.map(function (x) { return _this.allPathsSatisfyingPredicate(predicate); })
            .reduce(function (acc, x) { return acc.concat(x); }));
    };
    WebEntryPathJSONValue.prototype.fillInMissingPath = function () {
        var _a;
        // TODO: implement me
        //throw Error("TODO");
        var entry = this.obj;
        return new WebEntryPathJSONValue({
            authority: entry.authority,
            path: (_a = this.obj.path) !== null && _a !== void 0 ? _a : "/",
            links: entry.links.map(this.fillInMissingPath)
        });
    };
    return WebEntryPathJSONValue;
}(ObjJSONValue));
exports.WebEntryPathJSONValue = WebEntryPathJSONValue;
exports.jsonLinkExample2 = new ArrJSONValue([
    new WebEntryPathJSONValue("one.com", "1", new ArrJSONValue([
        new WebEntryJSONValue("www.two.com", new ArrJSONValue([])),
        new WebEntryPathJSONValue("three.com", "", new ArrJSONValue([]))
    ])),
    new WebEntryJSONValue("www.four.com", new ArrJSONValue([
        new WebEntryJSONValue("seven.com", new ArrJSONValue([
            new WebEntryPathJSONValue("app.one.com", "2", new ArrJSONValue([
                new WebEntryJSONValue("eight.com", new ArrJSONValue([]))
            ]))
        ])),
        new ObjJSONValue({
            "authority": new StringJSONValue("app.three.com"),
            "path": new StringJSONValue("locations/42"),
            "links": new ArrJSONValue([])
        })
    ]))
]);
