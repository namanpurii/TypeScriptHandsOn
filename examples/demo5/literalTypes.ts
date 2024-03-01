// literal types: Quite literally literal
//Read at: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

// In addition to the general types string and number, we can refer to specific strings
// and numbers in type positions.

// One way to think about this is to consider how JavaScript comes with different ways
// to declare a variable. Both var and let allow for changing what is held inside the 
// variable, and const does not. This is reflected in how TypeScript creates types for 
// literals. 
// Read more about their differences: https://www.freecodecamp.org/news/differences-between-var-let-const-javascript/

let str1 = "Hello World"
str1 = "I got reassigned but thats okay cuz im 'let'" //try hovering over the variable name in the code editor. The type inferred from it is 'string' as let can be reassigned into another string as opposed to const which cant be reassigned

const str2 = "Hello WORLD" //try hovering over this const variable now. The type assigned to it is a literal type i.e. string content itself.

//useful ways of using literal types by combining them into unions. For example,
function compareString(a: string, b:string) : -1 | 0 | 1 {
    return a === b? 0 : a > b ? 1 : -1 
}
// or 

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}

printText("Hello TypeScript", "centre") // catches the error

//this is also possible:
let someString : "hello" = "hello" //.. but this is a not very useful usecase because you wouldnt wanna generally make a variable that always takes a single value
someString = "salut" // will throw literal type violation error 

// Sometimes with objects the properties dont tend to get the literal type rather a generic type. More about this issue and workaround can be read at: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference


