# force-latest-versions
Rewrites all dependencies and devDependencies to in package.json file to their latest version

# Installation 
Globally:
```
$ npm install force-latest-versions -g
```
As devDependency:
```
$ npm install force-latest-versions -D
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