//Indexed Access Types: 

type PersonInfo = {age: number; name: string; isAlive: boolean}
type Age = PersonInfo["age"] // we can use an indexed access type to look up a specific property on another type

// The indexing type is itself a type, so we can use in amalgamation with it.. unions, keyof, or other types entirely:

type T1 = PersonInfo["age" | "name"] // same as type T1 = string | number
type T2 = PersonInfo[keyof PersonInfo]
type T3 = PersonInfo["name"|"isAlive"]

// Type Indexing in Arrays

const someArray = [
    {name: "A", age: 15},
    {name: "B", age: 16},
    {name: "C", age: 17}
]

type Something = typeof someArray[number]
type Something2 = typeof someArray[number]["name"]