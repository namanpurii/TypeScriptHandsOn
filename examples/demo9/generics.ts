// Wisdom:
// A major part of software engineering is building components that not only have 
// well-defined and consistent APIs, but are also reusable. Components that are 
// capable of working on the data of today as well as the data of tomorrow will give
// you the most flexible capabilities for building up large software systems.

// In languages like C# and Java, one of the main tools in the toolbox for creating
// reusable components is generics, that is, being able to create a component that 
// can work over a variety of types rather than a single one. This allows users to 
// consume these components and use their own types.

// A very simple generic function in TypeScript looks like:

function SimpleGenericFunc<Type> (arg: Type) : Type {
    return arg
}

// We can say this version of a function is generic, as it works over a range of types.

// Here we can call our generic function in 2 ways:
let res1 = SimpleGenericFunc<string>("hello tsc") // here we explicitly set type to be string
// or
let res2 = SimpleGenericFunc("hello tsc") // here we let the compiler infer the type for us automatically

// We might need to explicitly set the type ourselves for complex examples when the compiler fails to do so.

// 1. Working with Generics:

// When working with generics the compiler will enforce that you use any generically
// typed parameters in the body of the function correctly.
// Lets take an example:
function genericFunc1<Type> (arg: Type): Type {
    // what if we are tempted to write this to log the length of our agument?
    return arg.length
}

// But not all argument types would have the .length property available and nor did
// we specify to any take arrays as arguments. Hence an error is throw at us to enforce
// specific types to Type which have the .length member

function fixedGenericFunc1<Type> (arg: Type[] /*or Array<Type>*/): Type | number { 
    return arg.length
}
// or using generic constraints:
function fixedGenericFunc2<Type extends {length:number}> (arg: Type):Type|number {
    return arg.length
}

console.log(fixedGenericFunc1([1,2,3]))

// 2. Generic Types
// We can also have a generic function be represented by a type alias or an interface

// The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:
type GenericFuncType = <Type>(arg: Type[])=>Type|number // Now the type of our generic function is modular we can pass this type as an argument or use this generic func type to create more functions of this type
function someFunc(fn: GenericFuncType /* or write directly, fn: <Type>(arg: Type[])=>Type|number*/) {
    const res = fn([1, 2 , 3])
    console.log(res)
}
someFunc(fixedGenericFunc1)

// Creating more functions from our generic function type. We might start calling this a generic interface!
let anotherFunc: GenericFuncType = fixedGenericFunc1
anotherFunc([1,2,3]) // WoW \o/

// We can also write the generic type as a call signature (discussed in ./examples/demo7)
// interface GenericInterfaceFn {
//     <Type>(arg: Type[]) : Type|number // call signature syntax is expected if a function is a part of an object literal
// } 
// We can modify the above interface to have the user specify the type he wants for this generic interface just like we can do with Arrays like Array<number>, Array<string>, etc. :
interface GenericInterfaceFn<Type> {
    <Type>(arg: Type) : Type
}

// If all of this we talked about sounds confusing. You can refer to the source from where all this is coming from i.e https://www.typescriptlang.org/docs/handbook/2/generics.html

// 3. Generic Classes:
// A generic class has a similar shape to a generic interface:

class GenericClass<SomeType> {
    //@ts-ignore
    zeroValue: SomeType;
    //@ts-ignore
    add: (x: SomeType, y:SomeType) => SomeType;
}

let myGenericInstance = new GenericClass<number>()
myGenericInstance.zeroValue = 0
myGenericInstance.add = function (x,y) {
    return x + y
}

// All of what I comprehended is in this. Theres more to the source where I am reading this from, and I currently have no idea about it..
// But heres the source: https://www.typescriptlang.org/docs/handbook/2/generics.html

