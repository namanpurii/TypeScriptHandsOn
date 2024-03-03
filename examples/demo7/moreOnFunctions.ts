// Source: https://www.typescriptlang.org/docs/handbook/2/functions.html

// Ways to describe a function in TypeScript:

// 1. Function Type Expressions: These type descriptions are syntactically similar to arrow functions
// For example,
function greeter(fn: (a:string) => void) {
    fn("Hello World")
}

function argumentFunction(s: string) {
    console.log(s)
}

greeter(argumentFunction)

// 2. Using a type alias
type functionParam = (a:string) => void;
function greeter2(fn: functionParam) {
    fn("Hello from Greeter2")
}

greeter2(argumentFunction)

//3. Call Signatures:
// In javascript functions can have properties in addition to being callable. But the
// function type expression syntax doesnt allow for declaring properties. Thus we can 
// write a type alias of a `call signature` in an object type to account for the same.

type paramFunctionWithProperties = {
    counter: number;
    (a: string) : void;//only difference between a call signature and type alias is that we cant use '=>' and should use ':' for specifying the return type
}

function doesSomething(fn: paramFunctionWithProperties) {
    fn("Hello World")
    console.log(`fn has been called ${++fn.counter} times so far`)
}
function argumentFn(s: string) {
    console.log(s)
}
argumentFn.counter = 0

for(let i =0; i<3; i++) doesSomething(argumentFn)

//4. Construct Signatures
// You can create a construct signature by adding the new keyword in front of a call signature
// and in this process the function rather becomes some sort of a parameterised constructor. For example,

type paramFunctionAsConstructor = {
    new (s : string): void;
}

function someFunc(fn: paramFunctionAsConstructor) {
    return new fn("Hello")
}

class ArgFunc {
    constructor(s: string) {
        console.log(s)
    }
}

someFunc(ArgFunc)

// 5. Generic Functions: Generics are all about relating two or more values with the same type

// Its common to write a function where the types of the input relate to the type of output, or
// where the type of two inputs are related in some way. Lets take an example of a function:

function firstElement(arr: any[]) {
    return arr[0] // this function does its job but unfortunately has the return type `any`. Itd be better if the function returned the type of array element
}

// We can work our way around this by using generics! 
// In TypeScript, generics are used when we want to describe a correspondence between two values. We do this be declaring a type parameter in the function signature

function firstElementIsAGenericFuncNow <Type>(arr: Type[]): Type | undefined {
    return arr[0]
}

// By adding a type parameter Type to this function and using it in two places, 
// we’ve created a link between the input of the function (the array) and the 
// output (the return value). Now when we call it, a more specific type comes out:

const s = firstElementIsAGenericFuncNow(['a', 'b', 'c']) //try hovering over s and see how the `Type` acts as a placeholder and replaces it with the type Typescript infers from the original argument in this case a string array
//or
const n = firstElementIsAGenericFuncNow([1, 2, 3])
//or
const u = firstElementIsAGenericFuncNow([1, true, "three"]) // return type is now a union of number|boolean|string|undefined

// A peek at inference:
// Note that we didnt have to specify `Type` in this example. The type was inferred automatically by TypeScript
// In the above example we've used only one type parameter i.e. `Type` but we can use multiple too!
function map <Input, Output> (arr: Input[], fn: (arg: Input)=>Output): Output[] {
    return arr.map(fn)
}

const parsed = map(["1", "2", "3"], (n)=>parseInt(n)) //first infers the type of the array ["1", "2", "3"] as string[] and the type parameter `Input` (i like to call these placeholders) is inferred to have the type string now, similarly from the arrow function (n)=>parseInt(n). The second type parameter `Output` is replaced and inferred to have type number

// Constraints on Generic Function type parameters:
// We’ve written some generic functions that can work on any kind of value. 
// Sometimes we want to relate two values, but can only operate on a certain 
// subset of values. In this case, we can use a constraint to limit the kinds
// of types that a type parameter can accept. For example:

function longest<Type extends any[]> (a: Type, b: Type) : Type {
    if(a.length >= b.length) return a
    else return b
}

const longerArray = longest([1,2,3,4], [1,2,3,4,5]);
// we need to prevent numbers or strings to be passed in as argument because they dont have .length property. In such a case where we need the type parameter to take certain types we can use the extends keyword
const longerString = longest(10 as number, 100 as number); // Voila! the generic type parameter Type is constrained using the extends any[] syntax. This constraint ensures that Type must be an array type. Now, if you try to call the function with non-array types, TypeScript will raise an error

// Basically what an extends constraint does is, it tells you to make sure before calling the function that it atleast fulfills the contraint. If not, then TypeScript raises an error like it does for the function call above
// Alternatively we could have used <Type extends {length: number}> which basically tells the user to make sure that the arguments shall have a .length property for them to fulfill the constraint. Otherwise an error is thrown. Because only arrays have the .length property any other value type passed as argument would raise an error

//Common error while working with Constrained Values: https://www.typescriptlang.org/docs/handbook/2/functions.html#working-with-constrained-values

//Instead of letting TypeScript infer the intended type arguments in a generic function call. You can specify type arguments. For example:
function combine<Type>(arr1: Type[], arr2: Type[]) {
    return arr1.concat(arr2)
}

// const someResult = combine([1,2,3], ["hello"]) //normally an error would be thrown to call this function with mismatched array as we have declared only one type parameter i.e. `Type` for both the arguments
// In such a case we can manually specify type:
const someResult = combine<string | number>([1,2,3], ["hello"])

// *** Guideline for writing good generic functions ***
// writing generic function can be overwhelming at times and its easy to get carried away with type parameters.
// Having too many type parameters or using constraints where they aren’t needed can make inference less 
// successful, frustrating callers of your function.

// - Push Type Parameters Down: https://www.typescriptlang.org/docs/handbook/2/functions.html#push-type-parameters-down
// - Use Fewer Type Parameters: https://www.typescriptlang.org/docs/handbook/2/functions.html#use-fewer-type-parameters
// - Type Parameters should appear twice: https://www.typescriptlang.org/docs/handbook/2/functions.html#type-parameters-should-appear-twice


// 6. Functions can have Optional Parameters:
// This is quite trivial if you are aware about optional chaining in JS. Using ? operator one  can make function arguments optional i.e. they can either take the annotated type or the type "undefined"
// Examples: https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters

// 7. Function Overloads:
// Function overloading is a way to use the same function name but the over all function signature differs in the number and type of arguments
// In TypeScript we approach function overloading in 2 steps: 1) Write the overloaded function signature and then, 2) Write the holistic implementation signature

//overload signatures
function overloadedFn(x: boolean) : void;
function overloadedFn(x: string) : void;

// implementation signature
function overloadedFn (x: boolean | string) {
    console.log(x)
} 
// or
// function overloadedFn<Type> (x: Type) {
//     console.log(x)
// }

overloadedFn(true)
overloadedFn("hello")

// Just as there are some ways to write good overloads. There also some rules to follow while writing good overloads: https://www.typescriptlang.org/docs/handbook/2/functions.html#writing-good-overloads

// 8. Other Types to know about - These are Types often used with functions

// Like all types, you can use these anywhere, but they are especially relevant in the context of functions:

//   - void:
//   void is an inferred return type of a function which dont have any return statements or dont explicitly return a value from those return statements.
     function nope() {
        return;
     }
//   void represents no return type
//   In Javascript, a function that doesnt return any value will implicitlty return undefined. However, void and undefined are not the same thing in TypeScript.

//   - object:
//   The special type object refers to any value that isnt a primitive (string, number, boolean, symbol, null, or undefined)
//   Note in JavaScript, function values are objects.

//   - unknown:
//   The unkown type represents `any` value. This is similar to the `any` type, but is more stricter(or safer) as its illegal to do anything with an unknown value
function f1(a: any) {a.something} //OK
function f2(a: unknown) {a.something} //not Ok

//   - never:
//   Some functions never return a value:
function builtToFail(msg: string): never {
    throw new Error(msg)
}
//   The never type represents values which are never observed. In a return type, this
//   means that the function throws an exception or terminates execution of the program.

//   never also appears when TypeScript determines there’s nothing left in a union. For example:
function fn3(x: string | number) {
    if(typeof(x)==="string") {console.log(x)}
    else if(typeof(x) === "number") {console.log(x)}
    else {console.log(x)} // here because the union type list got exhausted by typescript narrowing on coniditional constructs like if and else if. The type inferred for x in the else block is `never`
}

//   - Function: The global type Function describes properties like bind, call, apply, and 
//    others present on all function values in JavaScript. It also has the special property
//    that values of type Function can always be called; these calls return any.


// 9. Rest Parameters and Arguments: 
//    - Rest Parameters:
//    In JavaScript, the rest parameter syntax allows a function to accept an indefinite number of arguments as an array
//    In TypeScript, the type annotation on these parameters is implicitly any[] instead of any, and any type annotation given must be of the form Array<T> or T[], or a tuple type (which we’ll learn about later).

//    - Rest Arguments:
//    We can push indefinate amount of arguments as an array using the spread operator(...)

// 10. Parameter Destructuring:
// Just like how destructuring works in Javascript same can be done in TypeScript but the type annotation for the destructured variables goes after the destructuring syntax:
function fn4 ({ a, b, c }: { a: number; b:number; c:number }) {
    console.log(a + b + c)
}
fn4({a:1, b:2, c: 3})
// or
// type toMakeThingsLessVerbose = { a: number; b:number; c:number }
// function fn4 ({ a, b, c }: toMakeThingsLessVerbose) {
//     console.log(a + b + c)
// }









