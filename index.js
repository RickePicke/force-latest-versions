#!/usr/bin/env node
const path = require('path');
const writePkg = require('write-pkg');
const spinner = require('./spinner');
const { getLatestPackageVersions, printResults } = require('./utils');

module.exports = forceLatestVersion = async packageFile => {
    const stopSpinner = spinner();
    const artifactPath = path.resolve(process.cwd(), 'package.json');
    const artifact = packageFile || require(artifactPath);

    if (artifact) {
        const packageDeps = artifact.dependencies || {};
        const packageDevDeps = artifact.devDependencies || {};

        const { dependencies, devDependencies } = await getLatestPackageVersions(packageDeps, packageDevDeps);        
        writePkg.sync(artifactPath, { ...artifact, dependencies, devDependencies });
        stopSpinner();
        printResults({dependencies, devDependencies, packageDeps, packageDevDeps});
        return new Promise((resolve) => {
            resolve({ dependencies, devDependencies });
        });
    }
};

!module.parent && forceLatestVersion();
