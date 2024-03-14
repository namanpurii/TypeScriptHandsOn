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

// t.b.d