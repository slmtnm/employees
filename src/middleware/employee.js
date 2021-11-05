import validator from "validator";

const allowedRoles = [
    'developer',
    'qa',
    'manager',
    'devops',
    'dba'
]

export default async function parse(ctx, next) {
    // check that all required fields are present
    const requiredFields = ['name', 'surname', 'email', 'role']
    if (!requiredFields.every(field => field in ctx.request.body)) {
        ctx.throw(400, 'Bad request');
    }

    const { name, surname, email, role } = ctx.request.body;

    if (!validator.isAlpha(name) || !validator.isAlpha(surname) ||
        !validator.isEmail(email) || !allowedRoles.includes(role)) {
            ctx.throw(400, 'Bad request');
        }

    ctx.request.employee = {name, surname, email, role};
    await next();
}