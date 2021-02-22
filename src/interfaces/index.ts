export interface EmployeeData {
  employeeId: number;
  projectId: number;
  dateFrom: string;
  dateTo: string;
}

export interface EmployeesResponse {
  type: string;
  payload?: EmployeeData[];
  error?: string | null;
}

export interface State {
  employees: EmployeeData[];
  isLoading: boolean;
  error?: string | undefined;
}

export interface ActionError {
  type: string;
  error: string;
}

export interface EmployeesAction {
  type: string;
  payload: EmployeeData[];
}

export interface CoupleEmployees {
  id?: number;
  firstEmployeeId: number;
  secondEmployeeId: number;
  projectId: number;
  workingDays: number;
}