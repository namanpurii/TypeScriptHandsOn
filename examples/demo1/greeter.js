"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_1 = require("./hello");
function greeter(person) {
    return "".concat(hello_1.default, ", ") + person;
}
var user = "User 1";
document.body.textContent = greeter(user);
