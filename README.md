# force-latest-versions
Forces all dependencies and devDependencies to latest versions and writes it to the package.json file.

# Installation 
Globally:
```
$ npm install force-latest-versions -g
```
Or as a dependency:
```
$ npm install force-latest-versions
```

# Usage
Simply run command in your repository:
```
$ force-latest-versions
```


Or include to project:
```javascript
const artifact = require('./package.json');
const flv = require('force-latest-versions');

flv(artifact).then(data => {
    // ...
})
```