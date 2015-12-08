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
tsc --sourceMap --outDir app/ src/List.ts
