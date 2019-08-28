#!/usr/bin/env node
const writePkg = require('write-pkg');
const spinner = require('./spinner');
const { generateArtifactPath, getLatestPackageVersions, getUpdatedDepsInfo, printResults } = require('./utils');

module.exports = forceLatestVersion = async pathToArtifact => {
    const stopSpinner = !module.parent ? spinner() : () => {};
    const artifactPath = generateArtifactPath(pathToArtifact);
    const artifact = require(artifactPath);

    if (artifact) {
        const packageDeps = artifact.dependencies || {};
        const packageDevDeps = artifact.devDependencies || {};

        try {
            const { dependencies, devDependencies } = await getLatestPackageVersions(packageDeps, packageDevDeps);
            const updatedArtifact = { ...artifact, dependencies, devDependencies };
            writePkg.sync(artifactPath, updatedArtifact);

            stopSpinner();
            !module.parent && printResults({ dependencies, devDependencies, packageDeps, packageDevDeps });
            
            return Promise.resolve({ 
                dependencies: getUpdatedDepsInfo(dependencies, packageDeps),
                devDependencies: getUpdatedDepsInfo(devDependencies, packageDevDeps), 
                artifact
            });            
        } catch(err) {
            stopSpinner();
            return Promise.reject(err)
        }
    }
};

!module.parent && forceLatestVersion();
