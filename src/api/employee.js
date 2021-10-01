const employee = [
    {name: 'John', surname: 'Doe', role: 'QA'}
];

export async function getEmployee(ctx) {
    ctx.response.body = JSON.stringify(employee);
}