//As discussed earlier object types can be formulated either anonymously(i.e. directly in
//the function signature), using type alias or using an interface.

// - Anonymous:
function fn1(person: {name: string, age: number}) {
    return "Hello "+ person.name
}

// - Using type alias:
type Person = {
    name: string;
    age: number;
}

function fn2(person: Person) {
    return "Hello"+ person.name
}

// - Using interface:
interface Person2 {
    name: string;
    age: number;
}

function fn3(person: Person) {
    return "Hello" + person.name
}

// 1 . Property Modifiers:
// Each property in an object type can specify a couple of things: the type, whether the
// property is optional, and whether the property can be written to.

//     - Optional Properties:
//     As discussed earlier we can mark a property as optional using the ? operator. Example:
interface Point{
    x?: number;
    y?: number;
    isNeighbour: boolean;
}

function displayCoord(arg: Point) {
    if(arg.x) console.log(arg.x)
    if(arg.y) console.log(arg.y)
}

displayCoord({isNeighbour: true}) //valid
displayCoord({x: 1, isNeighbour: false}) //valid
displayCoord({x: 1, y:2, isNeighbour: true}) //valid

//     - readonly Properties:
//     Properties can also be marked as readonly for TypeScript. While it wont change
//     any behavior at runtime, a property marked as readonly can't be written to 
//     during typechecking.

interface someType {
    readonly prop: string;
}

function doSomething(obj: someType) {
    console.log(`prop has the value ${obj.prop}`); //we can read the property value
    obj.prop = "HELLO" //but we cant reassign it
}

// Using the readonly modifier doesnt necessary mean that the object is totally immutable. Its
// just that the property with the readonly modifier cant be re-written to:

interface Home {
    readonly resident: {name: string, age: number}
}

function setResident(home: Home) { //this gives an error because we are trying to reassign/rewrite the entire readonly property i.e. resident
    home.resident = {
        name: "resident guy",
        age: 22,
    }
}

//But we can do this:
function setResidentAge(home: Home) {
    home.resident.age = 22 // this is allowed as the resident.age is not a readonly property.
}

// Note: TypeScript doesn't factor/check whether properties on two types are readonly when checking whether those types are compatible. As a result, readonly properties can also change via aliasing. For example:
interface Person3 {
    name: string;
    age: number;
}

interface ReadOnlyPerson3{
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person3 = {
    name: "Batman",
    age: 37,
}

let readOnlyPerson: ReadOnlyPerson3 = writablePerson; // this works 
console.log(readOnlyPerson.age) //37
// readOnlyPerson.age++ // cant do this 
writablePerson.age++ //can do this and the changes will be reflected in its alias i.e readOnlyPerson
console.log(readOnlyPerson.age) //38

//     - Index Signatures: 
//     Sometimes you might not be aware of properties' names but you would know the shape/type of the value.
//     In such a case, you can use an index signature to describe the type of the "possible" properties and 
//     way to index them either by number, string or symbols. For example:

interface someInterface {
    name: string;
    age: number;
    //some other property which can be indexed as a string and has type `any`
    [prop: string]: any;
}

const somePerson:someInterface = {
    name: "Naman",
    age: 22,
    isMale: true //another property we added that otherwise wouldnt have conformed to the shape of interface `someInterface` if the index signature wouldnt have been present
}
console.log("somePerson", somePerson["isMale"] /*somePerson.isMale*/)

// Another example:
interface someInterface {
    name: string;
    age: number;
    //some other property which can be indexed as a number and has type `any`
    [prop: number]: any;
}

const someOtherPerson: someInterface = {
    name: "Hu",
    age: 33,
    1: false 
}
console.log("someOtherPerson:", someOtherPerson[1])


// 2. Excess Property Checks:
// In TypeScript, Object types get special treatment and undergo excess property checking
// when assigning them to other variables, or passing them as arguments. For example:

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig) : {color: string; area: number} {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20
    }
} 

let mySquare = createSquare({colour: "red", width: 100}) // notice the argument is spelled "colour" and not "color". In JavaScript querying "colour" would just return undefined silently.
// And in TypeScript, you can argue that this sort of call should be valid as the color property was anyways optional, and the extra colour property should be insignificant as it is never used
// However TypeScript takes the stance to report what probably could be a bug. Thus, if an object literal has any properties that the "target type" doesn't have, you will get an error.

//Getting around these checks is actually really simple. The easiest method is to use a type assertion:
mySquare = createSquare({colour: "red", width: 100} as SquareConfig) // By using the `as SquareConfig` type assertion, you are essentially telling TypeScript to treat the object literal as if it has the specified type (SquareConfig), even if the property names in the object literal are not an exact match. This can be useful when you know that the object structure is compatible with the specified type, but the property names may differ.
// Note: Just to revisit, other use of type assertions is to narrow down or widen inferred types. For example, if some array is inferred to have the type any[], i can use the type assertion syntax `as string[]` to narrow/confirm it down to a more specific type i know would be valid. Same goes if you want to widen the scope of the type inferred i.e. you can assert an inferred string[] type as `as any[]`

// However a better approach might be to add a string index signature if you're the object can have some extra properties which you might use.
interface SquareConfig {
    color?:string;
    width?: number;
    [propName: string]: any;
}
mySquare = createSquare({colour: "red", width: 100}) //ok, no type assertion needed

//One final way to get around these checks, which is a bit hacky, is to assign the object to another variable:
const squareOptions = { colour: "red", width: 100}
mySquare = createSquare(squareOptions) // since assigning `squareOptions` wont undergo excess propperty checks, the compiler wont give you an error.
// *** Although this workaaround would only work if there are any common properties between squareOptions and squareConfig ***

// 3. Extending Types:
// The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want.
// Just the concept of inheritance. If you feel like looking at examples of this: https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types

//But the extends keyword is available only to interface types? How to facilitate inheritance if we are working with type aliases? Intersection Types is the workaround!

// 4. Intersection Types:
// interfaces allowed us to build up new types from other types by extending them. TypeScript provides another construct called intersection types that is mainly used to combine existing object types.

interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

type ColorfulCircle  = Colorful & Circle // now ColorCircle will have all the members from object type Colorful and Circle. But you can always choose to extend on these properties with an additional & operator followed by an object literal

// type ColorfulCircle = Colorful & Circle & { 
//     something: any;
// }

function describeCircle(circle: ColorfulCircle) {
    console.log(circle.color, circle.radius /*,circle.something*/)
}

// 5. Interfaces vs. Intersections - Should you extend types or intersect them into a type alias?
// We just looked at two ways to combine types which are similar, but are actually subtly
// different. With interfaces, we could use an extends clause to extend from other types,
// and we were able to do something similar with intersections and name the result with a
// type alias. The principal difference between the two is how conflicts are handled, and
// that difference is typically one of the main reasons why you’d pick one over the other
// between an interface and a type alias of an intersection type.

// 6. Generic Object Types 
// Much like Generic functions. Actually quite similar. Should just give a single read to this section at: https://www.typescriptlang.org/docs/handbook/2/objects.html#generic-object-types 




