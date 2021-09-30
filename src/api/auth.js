module.exports = {
    async signinHandler(ctx, next) {
        console.log(ctx.request);
        ctx.response.body = "signin";
    },
    async loginHandler(ctx, next) {
        console.log(ctx.request.body);
        ctx.response.body = "login";
    },
};

function validatePassword(password) {
    return true;
}