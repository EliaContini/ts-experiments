// http://www.typescriptlang.org/Handbook#modules-going-external
export class ToDoList {
	
	domNode: HTMLElement; // this member is public by default
	
	// private member: accessible only from within other
	// members of the same class
	// In JavaScript conventions say to name private members
	// prefixing them with underscore (_)
	private _list: HTMLUListElement;
	private _buttonAdd: HTMLButtonElement;
	
	constructor(id: string) {
		this.domNode = document.getElementById(id);
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
		
		this._buttonAdd = document.createElement("button");
		this._buttonAdd.innerHTML = "Add";
		this._buttonAdd.setAttribute("class", "to-do-list__button to-do-list__button--add");
		buttonBar.appendChild(this._buttonAdd);
		this._buttonAdd.addEventListener(
			"click",
			function(event: Event) { context.itemAdd(context._list, event); }, 
			false
		);
		
		this.domNode.appendChild(container);
	}
	
	itemAdd(list: HTMLUListElement, event: Event) {
		var context = this;
		var item = document.createElement("li");
		item.setAttribute("class", "to-do-list__item");
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
		show.appendChild(button);
		button.addEventListener(
			"click",
			function(event: Event) { context.itemEdit(item, event); }, 
			false
		);
		
		list.appendChild(item);
	}
	
	itemRemove(item: HTMLElement, event: Event) {
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