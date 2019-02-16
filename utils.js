const exec = require('node-exec-promise').exec;

const getLatestVersions = async dependencies => {
    return Promise.all(Object.keys(dependencies).map((depName) => {
        return exec(`npm show ${depName} version`)
            .then(out => ({
                [depName]: out.stdout.replace('\n', '')
            }));
    }));
};

const getLatestPackageVersions = async (packageDeps, packageDevDeps) => {
    return Promise.all([
        getLatestVersions(packageDeps),
        getLatestVersions(packageDevDeps)
    ]).then(([deps, devDeps]) => {
        return {
            dependencies: deps.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
            devDependencies: devDeps.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        };
    });
};

const countNewVersion = (deps, packageDeps) => Object.entries(deps)
    .filter(([key, value]) => packageDeps[key] !== value)
    .reduce(acc => acc + 1, 0);

const printResults = ({ dependencies, devDependencies, packageDeps, packageDevDeps} ) => {
    const newDepVersionCount = countNewVersion(dependencies, packageDeps);
    const newDevDepVersionCount = countNewVersion(devDependencies, packageDevDeps);

    const numberOfDeps = `${newDepVersionCount} ${newDepVersionCount === 1 ? 'dependency' : 'dependencies'}`  ;
    const numberOfDevDeps = `${newDevDepVersionCount} ${newDevDepVersionCount === 1 ? 'devDependency' : 'devDependencies'}`;

    console.log(' ✅', '\x1b[32m Success!\x1b[0m')
    console.log(` Forced latest versions on \x1b[36m${numberOfDeps}\x1b[0m and \x1b[36m${numberOfDevDeps}\x1b[0m!\n`);
};

module.exports = {
    getLatestPackageVersions,
    printResults
};