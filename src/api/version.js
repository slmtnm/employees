import { promises } from 'fs';

export async function getVersionHandler(ctx) {
    const fileContent = await promises.readFile('package.json', 'utf8');
    const version = JSON.parse(fileContent).version;
    ctx.response.body = `${version}\n`;
}