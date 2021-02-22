import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { DataGrid, ColDef, Logger } from "@material-ui/data-grid";
import { State, EmployeeData, CoupleEmployees } from "@interfaces";
import { getOverlappingDaysInIntervals } from "date-fns";
import "./CustomDataGrid.css";

const CustomDataGrid = () => {
  const selectCoupleEmployees = createSelector(
    (state: State) => state.employees,
    (employees: EmployeeData[]) => {
      const coupleList: CoupleEmployees[] = [];

      let index: number = 1;
      const visitedCouples: string[] = [];
      for (let i = 0; i < employees.length; i++) {
        const firstEmployee = employees[i];
        for (let j = i + 1; j < employees.length; j++) {
          const secondEmployee = employees[j];

          let visitedCouple: string =
            String(
              Math.min(firstEmployee.employeeId, secondEmployee.employeeId)
            ) +
            String(
              Math.max(firstEmployee.employeeId, secondEmployee.employeeId)
            ) +
            String(firstEmployee.projectId) +
            (firstEmployee.dateFrom < secondEmployee.dateFrom
              ? firstEmployee.dateFrom + secondEmployee.dateFrom
              : secondEmployee.dateFrom + firstEmployee.dateFrom) +
            (firstEmployee.dateTo < secondEmployee.dateTo
              ? firstEmployee.dateTo + secondEmployee.dateTo
              : secondEmployee.dateTo + firstEmployee.dateTo);

          if (
            firstEmployee.projectId === secondEmployee.projectId &&
            visitedCouples.indexOf(visitedCouple) === -1 && firstEmployee.employeeId !== secondEmployee.employeeId
          ) {
            const range1 = {
              start: new Date(firstEmployee.dateFrom),
              end:
                firstEmployee.dateTo !== "NULL"
                  ? new Date(firstEmployee.dateTo)
                  : new Date(),
            };
            const range2 = {
              start: new Date(secondEmployee.dateFrom),
              end:
                secondEmployee.dateTo !== "NULL"
                  ? new Date(secondEmployee.dateTo)
                  : new Date(),
            };
            const couple: CoupleEmployees = {
              id: index,
              firstEmployeeId: firstEmployee.employeeId,
              secondEmployeeId: secondEmployee.employeeId,
              projectId: firstEmployee.projectId,
              workingDays: getOverlappingDaysInIntervals(range1, range2),
            };
            coupleList.push(couple);
            visitedCouples.push(visitedCouple);
          }
          index++;
        }
      }

      return coupleList.sort(
        (c1: CoupleEmployees, c2: CoupleEmployees) =>
          c2.workingDays - c1.workingDays
      );
    }
  );
  const coupleEmployees: CoupleEmployees[] = useSelector(selectCoupleEmployees);

  const columns: ColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "firstEmployeeId",
      headerName: "Employee ID #1",
      type: "number",
      width: 140,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
    {
      field: "secondEmployeeId",
      headerName: "Employee ID #2",
      type: "number",
      width: 140,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
    {
      field: "projectId",
      headerName: "Project ID",
      type: "number",
      disableColumnMenu: true,
      hideSortIcons: true,
    },
    {
      field: "workingDays",
      headerName: "Days worked",
      type: "number",
      width: 120,
      disableColumnMenu: true,
      hideSortIcons: true,
    },
  ];

  class LogData implements Logger {
    debug = (...args: any[]) => {};
    info = (rows: CoupleEmployees[]) => {
      const filteredEmployees = coupleEmployees.filter(
        (pair: CoupleEmployees) =>
          pair.workingDays === coupleEmployees[0]?.workingDays
      );

      if (filteredEmployees.length === 0) {
        console.info("No such employees");
      } else if (filteredEmployees.length === 1) {
        console.info(
          "The employees who worked the longest together in a project are:"
        );
      } else {
        console.info(
          "The employees who worked the longest together in a project are:"
        );
      }

      filteredEmployees.forEach((pair: CoupleEmployees) =>
        console.info(
          `Employee ID #1 - ${pair.firstEmployeeId}; Employee ID #2 - ${pair.secondEmployeeId}; Project ID - ${pair.projectId}; Working days - ${pair.workingDays};`
        )
      );
    };
    warn = (...args: any[]) => {};
    error = (...args: any[]) => {};
  }

  useEffect(() => {
    const logData = new LogData();
    logData.info(coupleEmployees);
  }, [coupleEmployees]);

  return (
    <div className="data-grid">
      <DataGrid
        rows={coupleEmployees}
        columns={columns}
        autoHeight
        pageSize={5}
      />
    </div>
  );
};

export default CustomDataGrid;
