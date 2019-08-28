const exec = require('node-exec-promise').exec;
const path = require('path');

const generateArtifactPath = pathToArtifact => {
    return pathToArtifact 
        ? path.resolve(pathToArtifact + '/package.json')
        : path.resolve(process.cwd(), 'package.json');
}


const getLatestVersions = dependencies => {
    return Promise.all(Object.keys(dependencies).map(async depName => {
        const out = await exec(`npm show ${depName} version`);
        return { [depName]: out.stdout.replace('\n', '') };
    }));
};

const getLatestPackageVersions = async (packageDeps, packageDevDeps) => {
    const [deps, devDeps] = await Promise.all([
        getLatestVersions(packageDeps),
        getLatestVersions(packageDevDeps)
    ]);
    
    return {
        dependencies: deps.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        devDependencies: devDeps.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };
};

const getUpdatedDepsInfo = (deps, packageDeps) => Object.entries(deps)
    .reduce((acc, [key, value]) => {
        return packageDeps[key] !== value
            ? { ...acc, [key]: { from: packageDeps[key], to: value } }
            : acc
    }, {});

const countNewDeps = (deps, packageDeps) => Object.entries(deps)
    .filter(([key, value]) => packageDeps[key] !== value)
    .reduce(acc => acc + 1, 0);

const printResults = ({ dependencies, devDependencies, packageDeps, packageDevDeps} ) => {
    const newDepVersionCount = countNewDeps(dependencies, packageDeps);
    const newDevDepVersionCount = countNewDeps(devDependencies, packageDevDeps);

    const numberOfDeps = `${newDepVersionCount} ${newDepVersionCount === 1 ? 'dependency' : 'dependencies'}`  ;
    const numberOfDevDeps = `${newDevDepVersionCount} ${newDevDepVersionCount === 1 ? 'devDependency' : 'devDependencies'}`;

    console.log(' ✅', '\x1b[32m Success!\x1b[0m')
    console.log(` Forced latest versions on \x1b[36m${numberOfDeps}\x1b[0m and \x1b[36m${numberOfDevDeps}\x1b[0m!\n`);
};

module.exports = {
    generateArtifactPath,
    getLatestPackageVersions,
    getUpdatedDepsInfo,
    printResults
};