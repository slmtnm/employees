const employee = [
    {name: 'John', surname: 'Doe', role: 'QA'}
];

module.exports = {
    async getEmployee(ctx, next) {
        ctx.response.body = JSON.stringify(employee);
    }
}