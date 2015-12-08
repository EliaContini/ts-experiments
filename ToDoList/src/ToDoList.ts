/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 * More info about export
 * http://www.typescriptlang.org/Handbook#modules-going-external
 */

import Collection = require("./collection/ListItem");
import Item = require("./collection/ToDoItem");

export class ToDoList {
	
	domNode: HTMLElement; // this member is public by default
	
	// private member: accessible only from within other
	// members of the same class
	// In JavaScript conventions say to name private members
	// prefixing them with underscore (_)
	private _data: Collection.ListItem<Item.ToDoItem>;
	private _list: HTMLUListElement;
	
	constructor(id: string) {
		this.domNode = document.getElementById(id);
		this._data = new Collection.ListItem<Item.ToDoItem>();
	}
	
	startup() {
		var context = this;
		var container = document.createElement("div");
		container.setAttribute("class", "to-do-list");
		
		var header = document.createElement("h1");
		header.innerHTML = "To Do List";
		header.setAttribute("class", "to-do-list__header");
		container.appendChild(header);
		
		this._list = document.createElement("ul");
		this._list.setAttribute("class", "to-do-list__list");
		container.appendChild(this._list);
		
		var buttonBar = document.createElement("div");
		buttonBar.setAttribute("class", "to-do-list__button-bar");
		container.appendChild(buttonBar);
		
		var button = document.createElement("button");
		button.innerHTML = "Completed";
		button.setAttribute("class", "to-do-list__button");
		buttonBar.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemComplete(context._list, event); }, 
			false
		);
		button = document.createElement("button");
		button.innerHTML = "Add";
		button.setAttribute("class", "to-do-list__button to-do-list__button--left-spacer to-do-list__button--add");
		buttonBar.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemAdd(context._list, event); }, 
			false
		);
		
		this.domNode.appendChild(container);
	}
	
	itemAdd(list: HTMLUListElement, event: Event) {
		var id = String(new Date().getTime());
		var context = this;
		var item = document.createElement("li");
		item.setAttribute("class", "to-do-list__item");
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		item.appendChild(checkbox);
// edit mode
		var edit = document.createElement("div");
		edit.setAttribute("class", "to-do-list__edit");
		var input = document.createElement("input");
		input.setAttribute("class", "to-do-list__input");
		input.setAttribute("type", "text");
		edit.appendChild(input);
		item.appendChild(edit);
		// cancel
		var button = document.createElement("button");
		button.innerHTML = "Cancel";
		button.setAttribute("class", "to-do-list__button to-do-list__button--left-spacer to-do-list__button--remove");
		button.setAttribute("data-id", id);
		edit.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemRemove(item, event); }, 
			false
		);
		// save
		button = document.createElement("button");
		button.innerHTML = "Save";
		button.setAttribute("class", "to-do-list__button to-do-list__button--left-spacer to-do-list__button--add");
		button.setAttribute("data-id", id);
		edit.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemSave(item, event); }, 
			false
		);
// display mode
		var show = document.createElement("div");
		show.setAttribute("class", "to-do-list__show hide");
		var value = document.createElement("span");
		value.setAttribute("class", "to-do-list__value");
		show.appendChild(value);
		item.appendChild(show);
		// remove
		button = document.createElement("button");
		button.innerHTML = "Delete";
		button.setAttribute("class", "to-do-list__button to-do-list__button--left-spacer to-do-list__button--remove");
		button.setAttribute("data-id", id);
		show.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemRemove(item, event); }, 
			false
		);
		// edit
		button = document.createElement("button");
		button.innerHTML = "Edit";
		button.setAttribute("class", "to-do-list__button to-do-list__button--left-spacer to-do-list__button--add");
		button.setAttribute("data-id", id);
		show.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemEdit(item, event); }, 
			false
		);
		
		list.appendChild(item);
		
		var toDoItem = new Item.ToDoItem(id, checkbox, item);
		this._data.add(toDoItem);
	}
	
	itemComplete(list: HTMLUListElement, event: Event) {
		var items = this._data.toArray();
		var item = null;
		var node = null;
		for(var i = 0, length = items.length; i < length; i++) {
			item = items[i];
			node = item.node.querySelector(".to-do-list__value");
			if(item.checkbox.checked) {
				if(node.classList.contains("to-do-list__value--completed")) {
					node.classList.remove("to-do-list__value--completed");
				}
				else {
					node.classList.add("to-do-list__value--completed");
				}	
			}
		}
	}
	
	itemRemove(item: HTMLElement, event: Event) {
		var id = (<HTMLElement> event.target).getAttribute("data-id");
		this._data.remove(id);
		this._list.removeChild(item);
	}
	
	itemSave(item: HTMLElement, event: Event) {
		// casting
		// querySelector returns a HTMLElement
		// HTMLElement is an interface. We need to cast
		// explicitly with the correct implementation
		var input = <HTMLInputElement> item.querySelector(".to-do-list__input");
		var value = <HTMLSpanElement> item.querySelector(".to-do-list__value");
		value.innerHTML = input.value;
		
		var edit = item.querySelector(".to-do-list__edit");
		var show = item.querySelector(".to-do-list__show");
		edit.classList.add("hide");
		show.classList.remove("hide");
	}
	
	itemEdit(item: HTMLElement, event: Event) {
		var edit = item.querySelector(".to-do-list__edit");
		var show = item.querySelector(".to-do-list__show");
		edit.classList.remove("hide");
		show.classList.add("hide");
	}
}