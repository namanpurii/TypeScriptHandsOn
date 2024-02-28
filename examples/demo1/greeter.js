"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore 
var hello_1 = require("./hello"); //https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
//classes in TypeScript
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.fullName = firstName + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "".concat(hello_1.default, ", ") + person.firstName + " " + person.lastName;
}
var user = { firstName: "Naman", lastName: "Puri" }; //try changing this to some other type than what is emphasized by the type annotation above, and typescript shall throw an error
document.body.textContent = greeter(user); // this will throw error in the transpiled JS code as document is undefined
var obj = new Student("John", "Doe");
console.log("Hi ", obj.fullName);
