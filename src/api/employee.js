const employee = [
    {name: 'John', surname: 'Doe', role: 'QA'}
];

export async function getEmployeeHandler(ctx) {
    ctx.response.body = JSON.stringify(employee);
}