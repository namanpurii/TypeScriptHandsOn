//The Common Primitives: string, number and boolean

//Type annotations in array can be done by using : number[] or string[] or boolean[] or a combination of these(aka union types) or some custom abstract type
const arr : (number | string)[] = [1, "2", "3"] 

// any: TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors.
let obj : any = { prop: 0 } //object of type 'any'

//type annotations on variables
const nameOfMe: string = "Naman"; //although this isnt needed as TS infers these automatically

//type annotations to functions
function greet(person: string, date: Date) : string { //both argumnent types and function return type are annotated
  return `Hello ${person}, today is ${date.toLocaleDateString()}!` //Note: By default tsc transpiles to ES3 code(provides no feature like template strings) but you can set the --target es2015 flag and emit the es6 code which provides template strings as a feature
}
 
console.log(greet("Brendan", new Date()))

//type annotations for functions which return Promises
async function fetchSomething () : Promise<object> {
    const res = await fetch('https://api.github.com/users/namanpurii')
    return res // returns a promise
    // const user = await res.json()
    // console.log(user)
}

console.log(fetchSomething())

// type annotations for Anonymous functions and Arrow functions can be inferred through contextual typing. For example:
const names= ["a", "b", "c"]

//Contextual typing for function - parameter inferred to have type string
names.forEach((e)=>{
    console.log(e.toUpperCase())
})

// The Object Type : To define an object type, we simply list its properties and their types.
//For example,

function pd(pt: {x: number, y?: number}) { //emphasizes that pt parameter here is of type object with the properties x and y
    //if we didnt specify the type of x and y it will be assumed as 'any'
    // the ? specifies that y is an optional property, this concept is not specific to typescript 
    console.log(pt.x)
    console.log(pt.y)
}
pd({x:2, y: 3}) //where x and y are properties

//Union Types : TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators.
//Example 1:
const arr2 : (number|string)[] = [1, "2", "from"]

//Example 2:
function displayId(arrayOfIds: (number|string)[]) {
    arrayOfIds.forEach((id)=>{
        console.log(id.toUpperCase()) //gives an error as toUpperCase() operation exists on string but not on number. Thus, TS will only allow operations if it is valid for every member of the union(for example, .slice() method works both on arrays and strings)
    })
    // workaround:
    // arrayOfIds.forEach((id)=>{
    //     if(typeof(id) === "string"){
    //         console.log(id.toUpperCase())
    //     } else {
    //         console.log(id)
    //     }
    // })
}

displayId(arr2)

//Example 3:
function displayStringOrStringArray(x: string | string[]) {
    if(Array.isArray(x)) console.log("hey this is an array")
    else console.log("hey this is a string")
}

displayStringOrStringArray(["1", "from", "six"])
// or displayStringOrStringArray("six")

// Type Aliases: 
// We've been using object types and union types by writing them directly in type annotations
// but this process would easily become exhaustive if multiple functions require the same 
// parameter configuration. Type aliases come handy here, by providing that common type
// a single name and thereby making it modular to use. For example:

type Point = { //note: this is a type alias not a JS object although you can use comma in place of semicolons just as objects but it is preferred to keep it this way to distinguish between the two
    x: number;
    y: number;
}

function printCoord(pt: Point) {
    console.log(pt.x);
    console.log(pt.y);
}

printCoord({x: 2, y: 3})

//type alias can be used to name any type at all, not just an object type. For example,
type ID = number | string
// or something as simple as:
type sanitisedString = string // not sensible though

// Interfaces: An interface declaration is another way of naming object types. Interfaces may only be used to declare the shapes of objects, not rename primitives. For example:
interface Coord {
    x: number;
    y: number;
}

function printPoint(pt: Coord) {
    console.log(pt.x)
    console.log(pt.y)
}

printPoint({x: 2, y: 3})

// What are the differences between Type Aliases and Interfaces ??

// - Type Aliases and Interfaces are very similar and can be used interchangeably in many
//   cases. Almost all the features of interfaces are available in type aliases as well

// - *** Key Disinction *** A type cant be reopened to add new properties vs and interface
//   is always extensible (i.e. inheritance)

// For example, 
interface Person {
    name: string;
    age: number;
}

interface DLCandidate extends Person { //Extending an interface
    isAdult?: boolean;
}

function verifyCandidate(candidate: DLCandidate) : boolean {
    if(candidate.age>=18) candidate.isAdult = true
    else candidate.isAdult = false
    
    return candidate.isAdult
}

const result = verifyCandidate({name: "Naman", age: 22})

// We can also extend type aliases but it isnt as trivial as interfaces. For example:

type Animal = {
    name : string;
    hasWings : boolean;
}

type Bird = Animal & { //extending a type via intersections
    isBird?: boolean
}

function isThisAnimalABird(animal: Bird) : boolean {
    if(animal.hasWings) animal.isBird = true;
    else animal.isBird = false
    return animal.isBird
}

const res = isThisAnimalABird({name: "elephant", hasWings: false})

// Learn more about such examples here: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// For the most part, you can choose based on personal preference, and TypeScript will 
// tell you if it needs something to be the other kind of declaration. If you would like
// a heuristic, use interface until you need to use features from type.

