const employee = [
    { name: 'John', surname: 'Doe', role: 'QA' },
];

/** Handler that returns list of employees */
export async function getEmployeeHandler(ctx) {
    ctx.response.body = JSON.stringify(employee);
}
