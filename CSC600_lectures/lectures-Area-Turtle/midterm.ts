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


/* ==========================================================================  **
# File System

For this midterm, we will be working with a **file system**. A file system organizes
a collection of **files** and **directories** in a tree structure. You can access
the file system on a Windows machine through a graphical user interface (GUI) using
`File Explorer` or on an Apple machine through `Finder`. By clicking on a directory,
we can **recursively** traverse into it's contents, which may contain more directories
and/or files. Your task on this midterm will be to implement a toy model of some of the
usual functionality associated with a file system such as creating and deleting files.

The toy model we will use for this midterm is the algebraic data-type given below.
** ============================================================================ */

export type File = { 
  tag: "FILE",                   // A file, e.g., `file1.txt`, `file2.png`, `file3.mpeg`
  name: string,                  // The name of the file
};

export type Directory = { 
  tag: "DIRECTORY",              // A directory, e.g., `Documents`, `usr`, `tmp`
  name: string,                  // The name of the directory
  contents: FileSystemTree[]     // An array of the files and sub-directories of this dictectory.
};

export type FileSystemTree = File | Directory;

export function makeFile(name: string): FileSystemTree {
    // Constructor for creating a file
    return {
        tag: "FILE",
        name: name
    };
}

export function makeDirectory(name: string, contents: FileSystemTree[]): FileSystemTree {
    // Constructor for creating a directory
    return {
        tag: "DIRECTORY",
        name: name,
        contents: contents
    };
}


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

export const fstr1 =
    makeDirectory("/", [
        makeDirectory("Users",[
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


export function fileSystemTreeToString(fstr: FileSystemTree): string {
    // Helper function that converts a FileSystemTree into an indented string
    function go(indent: number, fstr: FileSystemTree): string {
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

console.log(fileSystemTreeToString(fstr1));



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

export function getName(fstr: FileSystemTree): string {
    return fstr.name;
}


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

export function getContentNames(dir: Directory): string[] {
    return dir.contents.map(getName);
}


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

// Iterative.
export function findFileOrDirectory(dir: Directory, name: string): FileSystemTree | undefined {
    for (const entry of dir.contents) {
        if (entry.name === name) {
            return entry;
        }
    }

    return undefined;
}

// Functional.
export function findFileOrDirectory2(dir: Directory, name: string): FileSystemTree | undefined {
    const filtered = dir.contents.filter(entry => entry.name === name);
    return filtered.length === 0 ? undefined : filtered[0];
}


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
    findFileOrDirectory(xs, makeFile("squid-game-1.mpeg")) = 
      [makeFile("squid-game-1.mpeg")]


Example 2:
    const xs = [makeFile("squid-game-1.mpeg")];
    findFileOrDirectory(xs, makeDirectory("squid-game-1.mpeg", [])) = 
      [makeDirectory("squid-game-1.mpeg", [])]


Example 3:
    const dir1 = makeDirectory("squid-game", [
        makeFile("squid-game-1.mpeg")
    ])
    const dir2 = makeDirectory("squid-game", [
        makeFile("squid-game-1.mpeg"),
        makeFile("squid-game-2.mpeg")
    ])

    findFileOrDirectory([dir1, makeFile("squid-game-3.mpeg")], dir2) = 
      [dir2]

** ----------------------------------------------------- */

export function replaceEntry(fstr: FileSystemTree[], newEntry: FileSystemTree): FileSystemTree[] {
    return fstr.map(e => e.name === newEntry.name ? newEntry : e);
}


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
      > hw4.ts

** ----------------------------------------------------- */

export function createFileOrDirInDir(dir: Directory, tag: "FILE" | "DIRECTORY", name: string): Directory {
  // dir    : the directory that we want to create a file or directory in
  // tag    : "FILE" means we should create a file and "DIRECTORY" means we should create a directory
  // name   : the name of the file or directory that we are creating
  //
  // return : a directory with a file or directory created

    if (findFileOrDirectory(dir, name) !== undefined) {
        return dir;
    } else {
        const newEntry = tag === "FILE" ? makeFile(name) : makeDirectory(name, []);
        return makeDirectory(dir.name, [... dir.contents, newEntry]) as Directory;
    }
}


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

export function copyFileSystemTree(fstr: FileSystemTree): FileSystemTree {
    switch (fstr.tag) {
        case "FILE":
            return makeFile(fstr.name);

        case "DIRECTORY":
            return makeDirectory(fstr.name, fstr.contents.map(copyFileSystemTree));
    }
}


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

const fstr2 = fileSystemTreeToString(createFileOrDir(fstr1, ["/"], "FILE", "tmp.txt"))

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

const fstr3 = fileSystemTreeToString(createFileOrDir(fstr2, ["/"], "FILE", "tmp2.txt"))

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

const fstr4 = fileSystemTreeToString(createFileOrDir(fstr3, ["/"], "FILE", "tmp2.txt"))

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

const fstr5 = fileSystemTreeToString(createFileOrDir(fstr4, ["/", "Users", "foobar"], "DIRECTORY", "Pictures"))

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

const fstr6 = fileSystemTreeToString(createFileOrDir(fstr5, ["/", "Users", "foobar"], "FILE", "Pictures"))

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

export function createFileOrDir(fstr: FileSystemTree, path: string[], tag: "FILE" | "DIRECTORY", name: string): FileSystemTree {
  // fstr   : the FileSystemTree we are modifying
  // path   : the path to a directory where we will create a file or directory
  // tag    :  "FILE" means we should create a file and "DIRECTORY" means we should create a directory
  // name   : the name of the file or directory to create
  //
  // return : a FileSystemTree with a created file

    if (fstr.tag !== "DIRECTORY") {
        throw new Error("Can only create in directory");
    }

    if (path.length === 0) {
        return createFileOrDirInDir(fstr, tag, name);
    } else {
        if (path[0] === "/") {
            return createFileOrDir(fstr, path.slice(1), tag, name);
        }

        const subdir = findFileOrDirectory(fstr, path[0]);
        if (subdir === undefined) {
            throw new Error("component " + path[0] + " not found");
        }

        const newSubdir = createFileOrDir(subdir, path.slice(1), tag, name);

        return makeDirectory(fstr.name, replaceEntry(fstr.contents, newSubdir));
    }
}

const fstr2 = createFileOrDir(fstr1, ["/"], "FILE", "tmp.txt");
const fstr3 = createFileOrDir(fstr2, ["/"], "FILE", "tmp2.txt");
const fstr4 = createFileOrDir(fstr3, ["/"], "FILE", "tmp2.txt");
const fstr5 = createFileOrDir(fstr4, ["/", "Users", "foobar"], "DIRECTORY", "Pictures");
console.log(fileSystemTreeToString(fstr5));

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

// First option, with helper function that has context.
export function findFilesOrDirs(fstr: FileSystemTree, predicate: (name: string) => boolean): string[][] {
    function go(fstr: FileSystemTree, path: string[]): string[][] {
        const newPath = [... path, fstr.name];

        const thisEntry = predicate(fstr.name) ? [newPath] : [];

        const subPaths = fstr.tag === "DIRECTORY"
            ? fstr.contents.flatMap(e => go(e, newPath))
            : [];

        return [... thisEntry, ... subPaths];
    }

    return go(fstr, []);
}

// Second option, without helper function, fixing results on the way up.
export function findFilesOrDirs2(fstr: FileSystemTree, predicate: (name: string) => boolean): string[][] {
    const thisEntry = predicate(fstr.name) ? [[fstr.name]] : [];
    const subPaths = fstr.tag === "DIRECTORY"
        ? fstr.contents
            .flatMap(e => findFilesOrDirs2(e, predicate))
            .map(path => [fstr.name, ... path])
        : [];

    return [... thisEntry, ... subPaths];
}

console.log(findFilesOrDirs(fstr5, (name: string) => name.endsWith(".ts")));
console.log(findFilesOrDirs(fstr5, (name: string) => name.endsWith(".app")));
console.log(findFilesOrDirs(fstr5, (name: string) => name.endsWith(".js")));
console.log(findFilesOrDirs2(fstr5, (name: string) => name.endsWith(".ts")));
console.log(findFilesOrDirs2(fstr5, (name: string) => name.endsWith(".app")));
console.log(findFilesOrDirs2(fstr5, (name: string) => name.endsWith(".js")));
