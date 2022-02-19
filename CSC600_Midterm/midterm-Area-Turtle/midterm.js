"use strict";
/* ==========================================================================  **
## Midterm Instructions

See this Google doc for clarifications to this midterm exam:

https://docs.google.com/document/d/1uGFPowk-c_xXFDGJtAqfTz92xyxlDLeR043MTtFiQs4/edit?usp=sharing

** ==========================================================================  **


1. Push your solution, contained entirely in midterm.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs midterm.ts
   ```
   to produce a file `midterm.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire midterm.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFilesOrDirs = exports.createFileOrDir = exports.copyFileSystemTree = exports.createFileOrDirInDir = exports.replaceEntry = exports.findFileOrDirectory = exports.getContentNames = exports.getName = exports.fileSystemTreeToString = exports.fstr1 = exports.makeDirectory = exports.makeFile = exports.RESOURCES_CONSULTED = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
exports.HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
exports.SIGNATURE = "Zachary Ma"; // TODO: FILL ME IN
// If you used any resources, please list them here
exports.RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];
function makeFile(name) {
    // Constructor for creating a file
    return {
        tag: "FILE",
        name: name
    };
}
exports.makeFile = makeFile;
function makeDirectory(name, contents) {
    // Constructor for creating a directory
    return {
        tag: "DIRECTORY",
        name: name,
        contents: contents
    };
}
exports.makeDirectory = makeDirectory;
/* ==========================================================================  **
Here is an example of a file-system tree.

/
  Users
    foobar
      Documents
        CSC600
          > hw1.ts
          > hw2.ts
          > hw3.ts
          > midterm.ts
      Downloads
        > squid-game-1.mpeg
  Applications
    Chrome
      > Chrome.app
    VSCode
      > VSCode.app

1. `/` is the **root* of the file system tree.
2. `Users` and `Application**, 2 spaces to the right of `/`, are children of `/`
    and are called **sub-directories** of `/`.
3. `foobar` is 2 spaces to the right of `Users` and is a **sub-directory** of
   `Users`. Similarly `Chrome` and `VSCode` are sub-directories of `Applications`.
4. The `>` symbol indicates that we have a **file** as opposed to a **directory**.
   For example, `Chrome.app` is a file that resides in the `Chrome` directory.
   Similarly, `hw1.ts` is a file that resides in the `CSC600` directory.
5. Every file and directory has an associated **path** that lists all the directories
   encountered along the way in the file system tree to the current file or directory.
   
   Example 1: the file `hw1.ts` has the path
   
       [ "/", "Users", "foobar", "Documents", "CSC600" ]

   Example 2: the file `squid-game-1.mpeg` has the path
       [ "/", "Users", "foobar", "Downloads" ]

   Example 3: the directory `Chrome` has the path
       [ "/", "Applications" ]

** ============================================================================ */
exports.fstr1 = makeDirectory("/", [
    makeDirectory("Users", [
        makeDirectory("foobar", [
            makeDirectory("Documents", [
                makeDirectory("CSC600", [
                    makeFile("hw1.ts"),
                    makeFile("hw2.ts"),
                    makeFile("hw3.ts"),
                    makeFile("midterm.ts"),
                ]),
            ]),
            makeDirectory("Downloads", [
                makeFile("squid-game-1.mpeg")
            ]),
        ])
    ]),
    makeDirectory("Applications", [
        makeDirectory("Chrome", [
            makeFile("Chrome.app")
        ]),
        makeDirectory("VSCode", [
            makeFile("VSCode.app")
        ])
    ])
]);
function fileSystemTreeToString(fstr) {
    // Helper function that converts a FileSystemTree into an indented string
    function go(indent, fstr) {
        switch (fstr.tag) {
            case "FILE": {
                return `${" ".repeat(indent)}> ${fstr.name}`;
            }
            case "DIRECTORY": {
                const x = `${" ".repeat(indent)}${fstr.name}`;
                const y = fstr.contents.map((fstr2) => `\n${go(indent + 2, fstr2)}`).join("");
                return `${x}${y}`;
            }
        }
    }
    return go(0, fstr);
}
exports.fileSystemTreeToString = fileSystemTreeToString;
console.log(fileSystemTreeToString(exports.fstr1));
/* ==========================================================================  **
# Problem 1 (25pts).

We will write some helper functions that read properties from a FileSystemTree.
** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 1a (5pts)

Extract the name of a File or Directory.

Example 1:

    getName(makeDirectory("foobar", [])) = "foobar"


Example 2:

    getName(makeFile("foobar")) = "foobar"

** ----------------------------------------------------- */
function getName(fstr) {
    // TODO: implement me
    //throw Error("TODO: implement me");
    return fstr.name;
}
exports.getName = getName;
/* ----------------------------------------------------- **
### Problem 1b (10pts).

Extract the names of all contents of a directory.
1. Do **not** recurse down sub-directories, i.e., stay within the current directory.
2. The order doesn't matter.
3. You can (optionally) use the `getName()` function in this solution.


Example 1:

    getContentNames(makeDirectory("foobar", [
      makeFile("squid-game-1.mpeg")
    ])) =
      ["squid-game-1.mpeg"]


Exmaple 2:

    getContentNames(makeDirectory("/", [
      makeFile("squid-game-1.mpeg"),
      makeFile("squid-game-2.mpeg")
    ])) =
      ["squid-game-1.mpeg", "squid-game-2.mpeg"]

** ----------------------------------------------------- */
function getContentNames(dir) {
    let acc = [];
    //console.log(dir.contents)
    //acc = acc.concat(dir.contents)
    for (let item in dir.contents) {
        acc = acc.concat(dir.contents[item].name);
    }
    return acc;
}
exports.getContentNames = getContentNames;
/* ----------------------------------------------------- **
### Problem 1c (10pts).

Find the file or directory with the given name.
1. Do not recurse down sub-directories, i.e., only look at the given directory.
2. If no entry exists with the given name, return undefined.

Example 1:

    findFileOrDirectory(makeDirectory("foobar", [
      makeFile("squid-game-1.mpeg")
    ]), "squid-game-1.mpeg") =
      makeFile("squid-game-1.mpeg")

Example 2:

    findFileOrDirectory(makeDirectory("foobar", [
      makeFile("squid-game-1.mpeg")
    ]), "squid-game-2.mpeg") =
      undefined

** ----------------------------------------------------- */
function findFileOrDirectory(dir, name) {
    // TODO: implement me
    //throw Error("TODO: implement me");
    for (let item in dir.contents) {
        //console.log(dir.contents[0].name)
        if (dir.contents[item].name == name) {
            return makeDirectory(dir.name, dir.contents);
        }
        else {
            return undefined;
        }
    }
    let acc = [];
    dir.contents = acc.concat(name);
    return makeDirectory(dir.name, dir.contents);
}
exports.findFileOrDirectory = findFileOrDirectory;
/* ==========================================================================  **
# Problem 2 (40pts).

We will write some helper functions that **modify** an existing FileSystemTree
and produce new FileSystemTrees.
** ============================================================================ */
/* ----------------------------------------------------- **
### Problem 2a (10pts).

Given a list of entries with unique names, replace the one that matches
the name of the new entry. Do **not** modify the other entries.


Example 1:
   const xs = [makeFile("squid-game-1.mpeg")];
   replaceEntry(xs, makeFile("squid-game-1.mpeg")) =
     [makeFile("squid-game-1.mpeg")]
 
 
Example 2:
   const xs = [makeFile("squid-game-1.mpeg")];
   replaceEntry(xs, makeDirectory("squid-game-1.mpeg", [])) =
     [makeDirectory("squid-game-1.mpeg", [])]
 
 
Example 3:
   const dir1 = makeDirectory("squid-game", [
       makeFile("squid-game-1.mpeg")
   ])
   const dir2 = makeDirectory("squid-game", [
       makeFile("squid-game-1.mpeg"),
       makeFile("squid-game-2.mpeg")
   ])
 
   replaceEntry([dir1, makeFile("squid-game-3.mpeg")], dir2) =
     [dir2, makeFile("squid-game-3.mpeg")]


** ----------------------------------------------------- */
function replaceEntry(fstr, newEntry) {
    // TODO: implement me
    //throw Error("TODO: implement me");
    let acc2 = [];
    let acc = [];
    for (let item in fstr) {
        acc2 = acc2.concat(newEntry);
    }
    //console.log(acc2)
    //acc = acc.concat(fileSystemTreeToString(newEntry))
    //acc2 = acc2.concat(fileSystemTreeToString(newEntry))
    return acc2;
}
exports.replaceEntry = replaceEntry;
/* ----------------------------------------------------- **
# Problem 2b (15pts).

Implement a **pure** function that creates a file or directory
within a specific directory. If there is a duplicate name (file
or directory), return the directory unchanged.

Suppose `dir` is a directory with fileSystemTreeToString representation

    CSC600
      > hw1.ts
      > hw2.ts
      > hw3.ts
      > midterm.ts

Example 1:

fileSystemTreeToString(createFileOrDirInDir(dir, "FILE", "hw1.ts")) =

    CSC600
      > hw1.ts
      > hw2.ts
      > hw3.ts
      > midterm.ts


Example 2:

fileSystemTreeToString(createFileOrDirInDir(dir, "DIRECTORY", "final")) =

    CSC600
      > hw1.ts
      > hw2.ts
      > hw3.ts
      > midterm.ts
      final


Example 3:

fileSystemTreeToString(createFileOrDirInDir(dir, "DIRECTORY", "hw4.ts")) =

    CSC600
      > hw1.ts
      > hw2.ts
      > hw3.ts
      > midterm.ts
      hw4.ts

** ----------------------------------------------------- */
function createFileOrDirInDir(dir, tag, name) {
    // dir    : the directory that we want to create a file or directory in
    // tag    : "FILE" means we should create a file and "DIRECTORY" means we should create a directory
    // name   : the name of the file or directory that we are creating
    //
    // return : a directory with a file or directory created
    // TODO: implement me
    //throw Error("TODO: implement me");
    switch (tag) {
        case "FILE": {
            return makeDirectory(dir.name, [makeFile(name)]);
        }
        case "DIRECTORY": {
            let acc2 = [];
            dir.contents = acc2.concat(name);
            return makeDirectory(dir.name, [makeDirectory(name, dir.contents)]);
        }
    }
}
exports.createFileOrDirInDir = createFileOrDirInDir;
/* ----------------------------------------------------- **
# Problem 2c (15pts).

Implement a **pure** function that creates a duplicate copy of
a FileSystemTree. That is, create an entirely new FileSystemTree.


Example:

fileSystemTreeToString(copyFileSystemTree(fstr1)) =
/
  Users
    foobar
      Documents
        CSC600
          > hw1.ts
          > hw2.ts
          > hw3.ts
          > midterm.ts
      Downloads
        > squid-game-1.mpeg
      Pictures
  Applications
    Chrome
      > Chrome.app
    VSCode
      > VSCode.app

** ----------------------------------------------------- */
function copyFileSystemTree(fstr) {
    // fstr   : the FileSystemTree to copy
    //
    // return : the FileSystemTree copy
    // TODO: implement me
    function go(indent, fstr) {
        switch (fstr.tag) {
            case "FILE": {
                return makeFile(fstr.name);
            }
            case "DIRECTORY": {
                //const x = `${" ".repeat(indent)}${fstr.name}`;
                //const y = fstr.contents.map((fstr2) => `\n${go(indent + 2, fstr2)}`).join("");
                return makeDirectory(fstr.name, fstr.contents);
            }
        }
    }
    //acc = acc.concat(fileSystemTreeToString(fstr))
    //throw Error("TODO: implement me");
    return go(0, fstr);
}
exports.copyFileSystemTree = copyFileSystemTree;
/* ==========================================================================  **
# Problem 3 (35pts).

Implement a **pure** function that creates a file or a directory. The previous two
problems may have given you useful functionality for implementing this function.

Special cases:
1. If a path does not exist, return the FileSystemTree unchanged.
2. If there is a duplicate name (file or directory), return the FileSystemTree unchanged.
3. You may assume that you are given an input FileSystemTree that has no duplicate file
   names or directories.


Example 1:

const fstr2 = createFileOrDir(fstr1, ["/"], "FILE", "tmp.txt");
fileSystemTreeToString(fstr2)

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app
      > tmp.txt


Example 2:

const fstr3 = createFileOrDir(fstr2, ["/"], "FILE", "tmp2.txt");
fileSystemTreeToString(fstr3)

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app
      > tmp.txt
      > tmp2.txt


Example 3:

const fstr4 = createFileOrDir(fstr3, ["/"], "FILE", "tmp2.txt");
fileSystemTreeToString(fstr4)

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app
      > tmp.txt
      > tmp2.txt


Example 4:

const fstr5 = createFileOrDir(fstr4, ["/", "Users", "foobar"], "DIRECTORY", "Pictures");
fileSystemTreeToString(fstr5)

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
          Pictures
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app
      > tmp.txt
      > tmp2.txt


Example 5:

const fstr6 = createFileOrDir(fstr5, ["/", "Users", "foobar"], "FILE", "Pictures");
fileSystemTreeToString(fstr5)

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
          Pictures
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app
      > tmp.txt
      > tmp2.txt


Hints:
1. Do not worry about efficiency.
2. A simpler problem to consider before writing this function is
   to think about how to traverse the FileSystemTree according to a
   path to reach a given directory.
3. You may want to use `createFileOrDirInDir`.

** ============================================================================ */
function createFileOrDir(fstr, path, tag, name) {
    // fstr   : the FileSystemTree we are modifying
    // path   : the path to a directory where we will create a file or directory
    // tag    :  "FILE" means we should create a file and "DIRECTORY" means we should create a directory
    // name   : the name of the file or directory to create
    //
    // return : a FileSystemTree with a created file
    // TODO: implement me
    //throw Error("TODO: implement me");
    for (let item in fstr) {
        //console.log(path[item.length])
        if (path[item.length] == fstr.name) {
            //console.log(path[item.length])
            let acc2 = [];
            return makeDirectory(path[item.length], [makeFile(name), copyFileSystemTree(fstr)]);
        }
    }
    //throw Error("yeet")
    return makeDirectory(path[0], [makeFile(name), copyFileSystemTree(fstr)]);
}
exports.createFileOrDir = createFileOrDir;
/* ==========================================================================  **
# BONUS / Extra Credit (25 pts).

Implement a **pure** function that returns the path starting from the root of the
FileSystemTree of all files and/or directories that satisfy a predicate on the name
of the file and/or directory.

Recall that `fileSystemTreeToString(fstr1)` is

    /
      Users
        foobar
          Documents
            CSC600
              > hw1.ts
              > hw2.ts
              > hw3.ts
              > midterm.ts
          Downloads
            > squid-game-1.mpeg
          Pictures
      Applications
        Chrome
          > Chrome.app
        VSCode
          > VSCode.app


Example 1:

findFilesOrDirs(fstr1, (name: string) => name.endsWith(".ts")) =
  [["/", "Users", "foobar", "Documents", "CSC600", "hw1.ts"],
   ["/", "Users", "foobar", "Documents", "CSC600", "hw2.ts"],
   ["/", "Users", "foobar", "Documents", "CSC600", "hw3.ts"]
   ["/", "Users", "foobar", "Documents", "CSC600", "midterm.ts"]]


Example 2:

findFilesOrDirs(fstr1, (name: string) => name.endsWith(".app")) =
  [["/", "Applications", "Chrome", "Chrome.app"],
   ["/", "Applications", "VSCode", "VSCode.app"]]


Example 3:

findFilesOrDirs(fstr1, (name: string) => name.endsWith(".js")) =
  []

** ============================================================================ */
function findFilesOrDirs(fstr, predicate) {
    // Optional TODO: implement me
    //throw Error("Optional TODO: implement me");
    let acc = [];
    for (let item in fstr) {
        acc = acc.concat([getName(fstr)]);
        for (let content in fstr) {
            acc = acc.concat();
        }
    }
    acc = acc.concat([getName(fstr)]);
    return acc;
}
exports.findFilesOrDirs = findFilesOrDirs;
