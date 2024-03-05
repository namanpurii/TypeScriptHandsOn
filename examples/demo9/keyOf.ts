// the `keyof` type operator:
// just returns a string literal or numeric literal union type of all the keys of some other object type's keys

type somePerson = {name: string, age: number}
type P = keyof(somePerson) // same as type P = "name"| "age"

// if the type has string or number index signatures it will return those types instead
type Arrayish = { [n: number]: unknown };
type someType1 = keyof Arrayish;
 
type Mapish = { [k: string]: boolean };
type someType2 = keyof Mapish;

// Note that in this example, M is string | number — this is because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].
// keyof types become especially useful when combined with mapped types