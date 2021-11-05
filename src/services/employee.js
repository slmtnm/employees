import * as EmployeeModel from '../dal/employee.js'

export async function create() {
    // TODO: Validate
    return EmployeeModel.create();
}

export const list = EmployeeModel.list;
export const remove = EmployeeModel.remove;