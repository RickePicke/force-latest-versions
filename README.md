# force-latest-versions
Forces all dependencies and devDependencies to latest versions and writes it to the package.json file.  That's it! Less is more! Keep it simple.. etc.

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
const flv = require('force-latest-versions');

(async () => {
    try {
        const res = await flv('path/to/artifact'); // Path to the folder of the package.json file
        console.log(res);
        // Do stuff with the result
    } catch(err) {
        console.error(err);
        // catch any error
    }
})();
```

## Return Value
The return value is an object with the following props:
 * artifact: _The updated artifact. An object reflecting package.json file_
 * dependencies: _The updated dependencies_
 * devDependencies: _The updated devDependencies_

The props "dependencies" and "devDependencies" have the following structure:
```javascript
{
    example: { from: '1.2.3', to: '2.3.4' },
    'one-more-example': { from: '3.4.5', to: '4.5.6' }
}
```

Have fun!!
