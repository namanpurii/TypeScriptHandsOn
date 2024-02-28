//@ts-ignore 
import hello from "./hello" //https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam

//classes in TypeScript
class Student {
    //by default the access modifier is public
    fullName: string;
    constructor (firstName: string, lastName: string) {
        this.fullName = firstName + " " + lastName
    }
}

//interfaces in TypeScript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) : string { // this is a type annotation of type 'Person' which is an interface to the parameter 'person'
    return `${hello}, ` + person.firstName + " " + person.lastName
}

let user = {firstName: "Naman", lastName: "Puri"}//try changing this to some other type than what is emphasized by the type annotation above, and typescript shall throw an error

document.body.textContent = greeter(user) // this will throw error in the transpiled JS code as document is undefined
const obj = new Student("John", "Doe")
console.log("Hi ", obj.fullName)