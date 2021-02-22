import { EmployeeData, EmployeesAction, State, ActionError } from "@interfaces";
import { employeesTypes } from "@redux";

const initialState: State = {
  employees: [] as EmployeeData[],
  isLoading: false,
};

const employeesReducer = (
  state: State = initialState,
  action: EmployeesAction | ActionError
) => {
  switch (action.type) {
    case employeesTypes.GET_EMPLOYEES_LIST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case employeesTypes.GET_EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: (action as EmployeesAction).payload,
        error: undefined,
      };
    case employeesTypes.GET_EMPLOYEES_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        employees: [] as EmployeeData[],
        error: (action as ActionError).error,
      };
    default:
      return state;
  }
};

export default employeesReducer;
