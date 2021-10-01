import { promises } from 'node:fs';

/** Handler that returns application version */
export async function getVersionHandler(ctx) {
    const fileContent = await promises.readFile('package.json', 'utf8');
    const version = JSON.parse(fileContent).version;
    ctx.response.body = `${version}\n`;
}
