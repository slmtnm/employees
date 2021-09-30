module.exports = {
  async getVersionHandler(ctx, next) {
    const version = require('../../package.json').version;
    ctx.response.body = `${version}\n`;
  },
};
