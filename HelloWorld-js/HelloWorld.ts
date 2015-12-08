/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 */

function greeter(person) {
    return "Hello, " + person + "!";
}

var user = "FrontEnders";
var node = document.getElementById("main");

node.innerHTML = greeter(user);