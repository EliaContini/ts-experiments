function greeter(person: string) {
    return `Hello, ${person}!`; // String templates ``
}

var user = "FrontEnders";
var node = document.getElementById("main");

node.innerHTML = greeter(user);