import { findById } from "../repositories/employeeRepository.js";

export async function getEmployeeById(employeeId: number) {
  const employee = await findById(employeeId);
  if (!employee) {
    throw { type: "NotFound", message: "employee not found" };
  }
  return employee;
}
