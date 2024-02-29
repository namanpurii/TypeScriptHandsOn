let msg = "Hello World" //here there is no need of explicitly type annotating the variable 'msg' because typescript has inferred its type on its own and hence does not throw any type error

//Explicit Type Annotations:
function greet(person: string, date: Date) : string {
  return `Hello ${person}, today is ${date.toLocaleDateString()}!` //Note: By default tsc transpiles to ES3 code(provides no feature like template strings) but you can set the --target es2015 flag and emit the es6 code which provides template strings as a feature
}
 
console.log(greet("Brendan", new Date()))