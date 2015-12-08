TypeScript Experiments
==============

## Summary

Tested on Ubuntu 12.04 LTS, with Node.js 0.10.25, npm 1.3.10 and TypeScript 1.6.2

## Installation on Ubuntu 12.04 LTS

### Install Node.js and npm

	sudo apt-get install nodejs npm
	cd /usr/bin
	sudo ln -s nodejs node
	
### Install TypeScript

	sudo npm install -g typescript
	
## Notes

To compile

	tsc HelloWorld.js
	
To compile and generate Source Maps

	tsc --sourceMap HelloHorld.js

To generate AMD module

	tsc --module "amd" HelloHorld.js
