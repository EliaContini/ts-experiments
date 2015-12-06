# build script
#
# generates modules amd suitable for RequireJS (http://requirejs.org/)
#
# More info about TypeScript Compiler options can be
# found at https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
#
clear
tsc --sourceMap --module "amd" --outDir app/ src/ToDoList.ts
tsc --sourceMap --module "amd" --outDir app/ src/App.ts
