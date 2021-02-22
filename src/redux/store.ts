import { createStore } from "redux";
import { employeesReducer } from "@redux";

export default createStore(employeesReducer);