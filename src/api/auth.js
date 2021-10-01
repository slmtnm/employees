export async function signinHandler(ctx) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    ctx.response.body = `User: ${username}, password: ${password}`;
}

export async function loginHandler(ctx) {
    console.log(ctx.request.body);
    ctx.response.body = 'login';
}
