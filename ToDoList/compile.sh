# 
# Author: Elia Contini <http://www.eliacontini.info>
# License: see LICENSE file in the repository root
#
# build script
#
# More info about TypeScript Compiler options can be
# found at https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
#
clear

tsc --sourceMap --module "amd" --outDir app/collection/ src/collection/Item.ts
tsc --sourceMap --module "amd" --outDir app/collection/ src/collection/List.ts
tsc --sourceMap --module "amd" --outDir app/collection/ src/collection/ListItem.ts
tsc --sourceMap --module "amd" --outDir app/collection/ src/collection/ToDoItem.ts

tsc --sourceMap --module "amd" --outDir app/ src/ToDoList.ts

tsc --sourceMap --module "amd" --outDir app/ src/App.ts
