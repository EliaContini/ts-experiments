/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 */

import Item = require("./Item");

export class ToDoItem implements Item.Item {
	id: string;
	checkbox: HTMLInputElement;
	node: HTMLLIElement;
	
	constructor(id: string, checkbox: HTMLInputElement, node: HTMLLIElement) {
		this.id = id;
		this.checkbox = checkbox;
		this.node = node;
	}
}