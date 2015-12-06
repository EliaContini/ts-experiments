function greeter(person) {
    return "Hello, " + person + "!";
}

var user = "FrontEnders";
var node = document.getElementById("main");

node.innerHTML = greeter(user);