/* 
 * Author: Elia Contini <http://www.eliacontini.info>
 * License: see LICENSE file in the repository root
 * 
 */

export interface List<T> {
	add(T);
	get(id: string);
	remove(id: string);
}