import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { csvJSON } from "@helpers";
import { EmployeesResponse } from "@interfaces";
import { getEmployeesListAttempt, getEmployeesListSuccess } from "@redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      display: "none",
    },
  })
);

const Upload = () => {
  const classes = useStyles();
  const dispatch: Dispatch<EmployeesResponse> = useDispatch();

  let fileReader: FileReader;
  let json: string | null | ArrayBuffer;

  const handleFileRead = () => {
    dispatch(getEmployeesListAttempt());
    const content = fileReader.result;

    if (typeof content !== "string") {
      return;
    }

    json = csvJSON(content.trim());
    dispatch(getEmployeesListSuccess(JSON.parse(json)));
  };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className={classes.root}>
      <input
        accept=".csv"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target?.files !== null && e.target?.files.length > 0) {
            handleFileChosen(e.target.files[0]);
          }
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};

export default Upload;
