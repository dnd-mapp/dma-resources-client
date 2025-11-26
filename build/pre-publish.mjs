import { copyFile, readFile, writeFile } from 'fs/promises';

async function prePublish() {
    console.log('Running pre-publish script...');
    const packageJsonContents = await readFile('package.json', { encoding: 'utf8' });

    const { name, version, license, description, author, repository, publishConfig, files, main } =
        JSON.parse(packageJsonContents);

    const publishPackageJson = {
        name: name,
        version: version,
        license: license,
        description: description,
        author: author,
        repository: repository,
        publishConfig: publishConfig,
        files: files,
        main: main,
    };

    await writeFile('dist/dma-resources-client/package.json', JSON.stringify(publishPackageJson, null, 2) + '\n', {
        encoding: 'utf8',
    });
    await copyFile('build/README.md', 'dist/dma-resources-client/README.md');
    await copyFile('LICENSE', 'dist/dma-resources-client/LICENSE');
}

prePublish()
    .then(() => console.log('Pre-publish script completed successfully.'))
    .catch((error) => console.error(error));
