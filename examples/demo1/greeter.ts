import hello from "./hello"

function greeter(person: string) { // this is a type annotation of type 'string' to the parameter 'person'
    return `${hello}, ` + person
}

let user = "User 1" //try changing this to some other type than what is emphasized by the type annotation above, and typescript shall throw an error

document.body.textContent = greeter(user)