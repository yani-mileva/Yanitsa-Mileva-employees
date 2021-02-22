import { employeesTypes } from "./actionTypes";
import { EmployeesResponse, EmployeeData } from "@interfaces";

export const getEmployeesListAttempt = (): EmployeesResponse => {
  return {
    type: employeesTypes.GET_EMPLOYEES_LIST,
    error: null,
  };
};

export const getEmployeesListSuccess = (
  employees: EmployeeData[]
): EmployeesResponse => {
  return {
    type: employeesTypes.GET_EMPLOYEES_LIST_SUCCESS,
    payload: employees,
    error: null,
  };
};

export const getEmployeesListFailure = (error: string): EmployeesResponse => {
  return {
    type: employeesTypes.GET_EMPLOYEES_LIST_FAILURE,
    error,
  };
};
