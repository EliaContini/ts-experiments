/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 * More info about generics
 * http://www.typescriptlang.org/Handbook#generics
 */
interface Item {
	"id": number;
}

interface List<T> {
	add(T);
	get(T);
	remove(T);
}

class ListItem<T extends Item> implements List<Item> {
	private _data: Item[];
	private _hash: Object;
	
	constructor() {
		this._data = [];
		this._hash = {};
	}
	
	add(item: Item) {
		this._data.push(item);
		this._hash[item.id] = this._data.length - 1;
	}
	
	get(item: Item) {
		return <T> this._data[this._hash[item.id]];
	}
	
	remove(item: Item) {
		var position = this._hash[item.id];
		var current = null;
		for(var i = position + 1, length = this._data.length; i < length; i++) {
			current = this._data[i];
			this._hash[current.id] = this._hash[current.id] - 1;
		}
		delete this._hash[item.id];
		this._data.splice(position, 1);
	}
	
	debug(message: string, item?: T) {
		console.log(`Debug ${message}:`, this._data, this._hash, item);
	}
}

// -------------------------------- Test --------------------------------
class FrontEndersTI implements Item {
	id: number;
	name: string;
	
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

var list = new ListItem<FrontEndersTI>();

var aldo = new FrontEndersTI(1, "Aldo");
list.add(aldo);
list.debug("ADD", aldo);

var elia = new FrontEndersTI(2, "Elia");
list.add(elia);
list.debug("ADD", elia);

var geoffroy = new FrontEndersTI(3, "Geoffroy");
list.add(geoffroy);
list.debug("ADD", geoffroy);

var aFrontEnder = list.get(elia);
list.debug("GET", aFrontEnder);

list.remove(elia);
list.debug("REMOVE", elia);