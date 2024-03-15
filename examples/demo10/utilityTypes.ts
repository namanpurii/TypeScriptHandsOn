// Utility Types are common type transformations that come handy and are available globally

// 1. Awaited<Type>
// This is used to model operations like await in async functions, specifically, the 
// way that they recursively unwrap Promise(s)

type A = Awaited<Promise<string>>
type B = Awaited<Promise<Promise<number|boolean>>>
type C = Awaited<boolean | Promise<Promise<number>>>

// 2. Partial<Type>
// Constructs a type from a given type which has all its properties set to optional

interface someType {
    title: string;
    description: string;
}

function updateGivenType(obj: someType, updatedObj: Partial<someType>) {
    return {...obj, ...updatedObj}
}

// 3. Required<Type>
// Constructs a type from a given type where all properties are set to required. This is the opposite of Partial

function updatedGivenType(obj: someType, updatedObj: Required<someType>) {
    return {...obj, ...updatedObj}
}

// 4. Readonly<Type>
// Constructs a type with all properties of Type set yto readonly meaning the properties
// of the constructed type cannot be reassigned.

interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "Delete inactive users"
}

todo.title = "Hello" // throws an error because "title" is set to readonly and hence cant be reassigned

// 5. Record<Keys, Type>
// Constructs an object type with property keys as 'Keys' and property values of type 'Type'

interface someTypeType {
    age: number
    breed: string
}

type Keys = "oliver" | "musk" | "grey"

const cats: Record<Keys, someTypeType> = {
    oliver: {age: 10, breed: "Persian"},
    musk: {age: 10, breed: "Persian"},
    grey: {age: 10, breed: "Persian"}
}

// 6. Pick<Type, Keys>
// Constructs a type by picking a set of properties(string literals or union of string literals) from Type

interface someType3 {
    name: string,
    age: number,
    isMale: boolean,
}

type typeWithNoGenderProp = Pick<someType3, "name" | "age">

// 7. Omit<Type, Keys> 
// This is the opposite of Pick as it removes the set of properties(i.e. specified by string literals or union of string literals) from Type

type typeWithOnlyGenderProp = Omit<someType3, "name" | "age">

// 8. Exclude<UnionType, ExcludedMembers>
// Constructs a type from a Union Type by excluding certain members of the UnionType which is specified in the syntax as `ExcludedMembers`

type T0 = string | boolean | number
type anotherType = Exclude<T0, string | number>

// 9. Extract<Type, Union>
// Basically constructs a type which is an intersection of `Type` and `Union`

type someOtherType = Extract<T0, string | number | (string|number)[]>

// 10. NonNullable<Type>
// Constructs a type by excluding null and undefined from Type
const someVal: NonNullable<string | null | undefined> = "jack"


