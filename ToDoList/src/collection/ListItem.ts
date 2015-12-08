/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 */

import Item = require("./Item");
import List = require("./List");

export class ListItem<T extends Item.Item> implements List.List<Item.Item> {
	private _data: Item.Item[];
	private _hash: Object;
	
	constructor() {
		this._data = Array<T>();
		this._hash = {};
	}
	
	add(item: Item.Item) {
		this._data.push(item);
		this._hash[item.id] = this._data.length - 1;
	}
	
	get(id: string) {
		return <T> this._data[this._hash[id]];
	}
	
	remove(id: string) {
		var position = this._hash[id];
		var current = null;
		for(var i = position + 1, length = this._data.length; i < length; i++) {
			current = this._data[i];
			this._hash[current.id] = this._hash[current.id] - 1;
		}
		delete this._hash[id];
		this._data.splice(position, 1);
	}
	
	toArray() {
		return this._data;
	}
	
	debug(message: string, item?: T) {
		console.log(`Debug ${message}:`, this._data, this._hash, item);
	}
}