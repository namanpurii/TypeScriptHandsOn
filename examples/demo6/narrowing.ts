// Source : https://www.typescriptlang.org/docs/handbook/2/narrowing.html
// the process of refining types to more specific types than declared is called narrowing. In many editors we can observe these types as they change, and we’ll even do so in our examples.

// For example,

function padLeft (padding: number|string, input:string) : string {
    if(typeof(padding) === "number") return input + " ".repeat(padding) + input // try hovering over the variable 'padding' in the code editor to loopkup its inferred type
    return padding + input //try hovering over 'padding' here and observe as how the type adjusts accordingly to the if..else constructs. This type of narrowing is automatically inferred by typescript by making use of something called as type guards, which are nothing but special checks and assignments done in the code
}

// theres a lot going under the hood than just type checking on the user specified type annotations : 
// TypeScript not only analyses the runtime values using static types but also also makes use of constructs (aka typegaurds) like if/else, 
// conditional ternaries, loops, truthiness checks, etc. which are native to the JavaScript runtime control flow and makes use of these on 
// top of its type analyis for narrowing its types further 

// There are couple of different constructs that TypeScript understands for narrowing:

// 1. `typeof` type guards:
// As already discussed in the padLeft example above, TypeScript used the `typeof` construct to infer and narrow down types to something more specific.
// The `typeof` operator returns a string indicating the type of the operand's value and this is all what it can return:
// - "undefined"
// - "object" which can mean anything from a null value to an array or a JS object -_-
// - "boolean" 
// - "number"
// - "bigint"
// - "string"
// - "symbol"
// - "function"

// A good example,

function printAll(strs: string | string[] | null) {
    if(typeof(strs) === "object") { //this condition is true if strs is either string[] or null.
        for(const s of strs) { // look how Typescript uses the `typeof` typegaurd to infer that the type of strs can pssobly be null! unknown to which we would've run the code and the Javascript runtime would throw an error of 'cant iterate over null'
            console.log(s)
        }
    } 
    else if(typeof(strs) === "string") {
        console.log(strs) 
    }
}

// what is the workaround then?? By Truthiness Narrowing i.e. just omit the if statement to: if(strs && typeof(strs) === "object") which kills the possibility of it being null in the first place 

// 2. Truthiness Narrowing
// - Falsy values in Javascript are: 0, NaN, "", On(the bigint verion of 0), null, undefined
// - Truthy Values in Javascript: All the other values which are not falsy

//Example: console.log(Boolean("hello")) -> type: boolean; value: true ***Note: Boolean is an operator(or its shorthand i.e. !! ) to coerce any value to the type 'boolean', in this example we coerce a value of type 'string' to the type 'boolean'*** 
// OR,  console.log(!!"hello") // is the same thing as above, !! is just a short hand to Boolean()

//Example of Truthiness Checking used as a typegaurd/construct by TypeScript for narrowing a.k.a Truthiness Narrowing
function addOffset (obj: {name?: string}) {
    if(obj.name) console.log(`Candidate Name: ${obj.name}`) // look at how TypeScript uses truthiness checking as a typeguard to infer obj.name from being either of type string|undefined to then being of type string. Try hovering over obj.name in the if clause and then in the statement inside it
    else console.log('Candidate name: Not provided')
}

addOffset({})

// 3. Equality Narrowing
// TypeScript also uses `switch` statements and equality checks like  ===, !==, == and != to narrow types. For example,

function equalityNarrowingExample(x: string | number, y: string | boolean) {
    if(x === y) { //sicne string is the only common type
        x.toUpperCase() //type narrowed down to string
        y.toUpperCase() //type narrowed down to string
    }
    else {
        console.log(x, y)
    }
}

// JavaScript’s looser equality checks with `==` and `!=` also get narrowed correctly. 
// If you’re unfamiliar, checking whether something `== null` actually not only checks
// whether it is specifically the value `null` - it also checks whether it’s potentially
// `undefined`. The same applies to `== undefined`: it checks whether a value is either `null`
// or `undefined`.
// For example:
function multiplyOffset(num: number | null | undefined, offset: number) {
    // if(num) return num*offset or
    if(num!=null) return num*offset //checks for both null and undefined and hence narrows down num to be just of the type 'number'
    else return 0
}

// 4. The `in` operator Narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing

// 5. `instanceof` Narrowing: More like type of but for pre-defined classes like (Date, String, etc. in JavaScript) or user-defined classes
// See Example at: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing

// 6. Narrowing through Assignments:
// - This can be automatic inferring of some variable that has been intialised. For example:

let variable = Math.random()<0.5 ? 10 : "goodbye" // automatically infers to the type: string|number
variable  = true; //This is because the declared type of variable - the type that variable started with - is string | number, and assignability is always checked against the declared type.

// 7. Control Flow Analysis:
// Up until this point, we’ve gone through some basic examples of how TypeScript narrows
// within specific branches. But there’s a bit more going on than just walking up from 
// every variable and looking for type guards in ifs, whiles, conditionals, etc. But apart
// from that type can also be narrowed/analysed on the basis of code reachibility. This is
// called Control flow analysis

// Example 1:
function CFAExample(num: number|string, input: string) {
    if(typeof(num) === "number") return " ".repeat(num) + input
    return num + input
}
// In this example if num is of type number the return statement out of the if clause is unreachable and the type is narrowed to number
// While if the statement renders false the type that is inferred and returned is string

// 8. Narrowing using type predicates — Not using native JavaScript construct
// We’ve worked with existing JavaScript constructs to automatically handle narrowing so
// far, however sometimes you want more direct control over how types change throughout 
// your code.

// To define a user-defined type guard, we simply need to define a function whose return
// type is a type predicate. 

// This is not so clear to me rn. You can read more at: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

// 9. Narrowing using Assertion Functions 
// Types can also be narrowed using assertion functions. 

//10. Discriminated Unions:
// Great example at: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions

// 11. Using the never keyword

// 12. Exhaustive Checking: A very exhaustive way of checking with too many conditional blocks

