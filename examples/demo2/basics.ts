// https://www.typescriptlang.org/docs/handbook/2/basic-types.html

const message = "Hello Typescript"
// console.log(message()) typescript will throw a static error as opposed to a js program which will only throw it at runtime

// the ES6 specification that gives instructions on how the langauge should behave when 
// it runs into something unexpected. For example, specification says that trying to call
// something that isn’t callable should throw an error. Maybe that sounds like “obvious
// behavior”, but you could imagine that accessing a property that doesn’t exist on an 
// object should throw an error too. Instead, JavaScript gives us different behavior and 
// returns the value undefined. That is to say, that even the JS runtime checking for errors
// doesnt account for a seemingly obvious error as an error. 
// Ultimately, a static type system has to make the call over what code should be flagged 
// as an error in its system, even if it’s “valid” JavaScript.

const user = {
    name: "Daniel",
    age: 26, 
}

// user.location; //typescript throws the error: Property 'location' does not exist on type '{ name: string; age: number; }'.

function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}
 
greet("Brendan"); //although this static error would be raised by TypeScript but tsc would still emit the JS code if you still want to go about generating it without fixing the error. This is the default behaviour of TypeScript(specifically tsc) i.e. to still emit on errors
// Read about No Emitting on Errors: https://www.typescriptlang.org/docs/handbook/2/basic-types.html#emitting-with-errors