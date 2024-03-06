// the typeof operator is native to JavaScript
// You can also use typeof operator in TypeScript to refer to the type of variable or property


let str = "hello"
let anotherThing: typeof str // although doesnt seem too useful here

type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate> //ReturnType<> is a predefined type available in TypeScript

function f() {
    return {x:10, y:3}
}

type SomeType = ReturnType<typeof f>

