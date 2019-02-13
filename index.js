#!/usr/bin/env node
const exec = require('node-exec-promise').exec;
const path = require('path');
const writePkg = require('write-pkg');

const getLatestVersions = async dependencies => {
    return Promise.all(dependencies.map(dependency => {
        return exec(`npm show ${dependency} version`)
            .then(out => ({
                [dependency]: out.stdout.replace('\n', '')
            }));
    }));
};

const getLatestPackageVersions = async (packageDeps, packageDevDeps) => {
    return Promise.all([
        getLatestVersions(Object.keys(packageDeps)),
        getLatestVersions(Object.keys(packageDevDeps))
    ]);
};

module.exports = forceLatestVersion = async packageFile => {
    const artifactPath = path.resolve(process.cwd(), 'package.json');
    const artifact = packageFile || require(artifactPath);

    if (artifact) {
        const packageDeps = artifact.dependencies || {};
        const packageDevDeps = artifact.devDependencies || {};

        let data = await getLatestPackageVersions(packageDeps, packageDevDeps);
        const [deps, devDeps] = data;
        const dependencies = deps.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        const devDependencies = devDeps.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        
        writePkg.sync(artifactPath, { ...artifact, dependencies, devDependencies });        
        console.log(`\nDone!\nForced versions on ${deps.length} dependencies and ${devDeps.length} devDependencies\n`);
        
        return new Promise((resolve) => {
            resolve({ dependencies, devDependencies });
        });
    }

};

forceLatestVersion();
