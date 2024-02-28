"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_1 = require("./hello");
function greeter(person) {
    return "".concat(hello_1.default, ", ") + person.firstName + " " + person.lastName;
}
var user = { firstName: "Naman", lastName: "Puri" }; //try changing this to some other type than what is emphasized by the type annotation above, and typescript shall throw an error
document.body.textContent = greeter(user);
