import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import { Cancel, Done, Refresh } from "@material-ui/icons";
import React, { Component } from "react";
import toast from "react-hot-toast";
import { Table } from "reactstrap";
import { APIURL } from "../../constants/APIURL";
import { pendingTaks } from "../../constants/Task_Details_COO&CDCP";
import HeaderComponent from "../HeaderComponent";
import LoadingComponent from "../LoadingComponent";
import { get, set, update } from "idb-keyval";

class COOComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      comment: "",
      chaperoneName: "",

      values: {},

      pendingTasks: pendingTaks,
      tasks: [],
      selectedRow: {
        taskId: "44eacf6b-a902-11eb-90de-dac0a6c2b73f",
        taskName: "CDCP Task",
        created_date: "2021-04-29T15:47:57.620+00:00",
        updated_date: null,
        taskDefKey: "formTask1",
        taskData: {
          employeeName: "Employee_4",
          empDeptName: "EQD Flow Sales NA",
          purpose: "PER",
          employeePID: "EMP_4",
          initiator: null,
          workPlaceCountry: "United Kingdom",
          nextTaskOutcome: "CDCP",
          destinationId: 545919.0,
          rowOrder: 1.0,
          travelRequestId: 501860.0,
          empDeptCode: "UUAC133",
          division: "IB",
          employeeType: "Private",
          aging: 3.0,
          employeePhnNbr: "+44 20 7883 2227",
          status: "Awaiting CDCP Response",
        },
      },
      isLoading: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleReject = () => {
    this.rejectAPI({
      taskId: this.state.selectedRow.taskId,
      userOutcome: "Reject",
      comments: this.state.comment,
    });
  };

  rejectAPI = (creds) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(creds);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APIURL + "travel-poc/completeTask", requestOptions)
      .then((response) => response)
      .then((result) => {
        console.log(result);
        toast.success("Task completed successfully with action Reject");
        this.handleDialogClose();
        this.getTasks();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Server Error");
        this.handleDialogClose();
      });
  };

  handleAccept = () => {
    if (this.state.chaperoneName.trim().length === 0) {
      toast.error("Please enter Chaperone Name before completing the task");
    } else {
      this.approveAPI({
        taskId: this.state.selectedRow.taskId,
        userOutcome: "Complete",
        chaperoneName: this.state.chaperoneName,
        comments: this.state.comment,
      });
    }
  };

  approveAPI = (creds) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(creds);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(APIURL + "travel-poc/completeTask", requestOptions)
      .then((response) => response)
      .then((result) => {
        console.log(result);
        toast.success("Task completed successfully with action Complete");
        this.handleDialogClose();
        this.getTasks();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Server Error");
        this.handleDialogClose();
      });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleDialogOpen = (selectedRow) => {
    var comment = "";
    var chaperoneName = "";
    if (selectedRow.taskData.comments === undefined) {
      comment = "";
    } else {
      comment = selectedRow.taskData.comments;
    }
    if (selectedRow.taskData.chaperoneName === undefined) {
      chaperoneName = "";
    } else {
      chaperoneName = selectedRow.taskData.chaperoneName;
    }
    this.setState({
      dialogOpen: true,
      selectedRow: selectedRow,
      comment: comment,
      chaperoneName: chaperoneName,
    });
    console.log(selectedRow);
  };
  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      selectedRow: {
        taskId: "44eacf6b-a902-11eb-90de-dac0a6c2b73f",
        taskName: "CDCP Task",
        created_date: "2021-04-29T15:47:57.620+00:00",
        updated_date: null,
        taskDefKey: "formTask1",
        taskData: {
          employeeName: "Employee_4",
          empDeptName: "EQD Flow Sales NA",
          purpose: "PER",
          employeePID: "EMP_4",
          initiator: null,
          workPlaceCountry: "United Kingdom",
          nextTaskOutcome: "CDCP",
          destinationId: 545919.0,
          rowOrder: 1.0,
          travelRequestId: 501860.0,
          empDeptCode: "UUAC133",
          division: "IB",
          employeeType: "Private",
          aging: 3.0,
          employeePhnNbr: "+44 20 7883 2227",
          status: "Awaiting CDCP Response",
        },
      },
      comment: "",
    });
  };

  getTasks = () => {
    this.setState({
      isLoading: true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var urlencoded = new URLSearchParams();
    get("adminValues").then((val) => {
      if (val !== undefined) {
        this.setState({
          values: val,
        });
      }
      console.log(val);
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(APIURL + "travel-poc/getPendingTasks", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var tasks = [];
        tasks = result.filter((item) => item.taskDefKey === "COO");
        get("adminValues").then((val) => {
          if (val !== undefined) {
            this.setState({
              values: val,
            });
          }
          console.log(val);
        });
        this.setState({
          tasks: tasks,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          isLoading: false,
        });
        toast.error("Server Error");
      });
  };

  componentDidMount() {
    this.getTasks();
  }
  render() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <LoadingComponent />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
        >
          <DialogContent>
            <div style={{ textAlign: "center" }}>
              <Table bordered>
                <tbody>
                  <tr>
                    <th>Travel Request Id</th>
                    <td>{this.state.selectedRow.taskData.travelRequestId}</td>
                  </tr>
                  <tr>
                    <th>Employee PID</th>
                    <td>{this.state.selectedRow.taskData.employeePID}</td>
                  </tr>
                  <tr>
                    <th>Employee Name</th>
                    <td>{this.state.selectedRow.taskData.employeeName}</td>
                  </tr>
                  <tr>
                    <th>Employee Department Name</th>
                    <td>{this.state.selectedRow.taskData.empDeptName}</td>
                  </tr>
                  <tr>
                    <th>Aging</th>
                    <td>{this.state.selectedRow.taskData.aging}</td>
                  </tr>
                  <tr>
                    <th>Workplace Country</th>
                    <td>{this.state.selectedRow.taskData.workPlaceCountry}</td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <TextField
                variant="filled"
                name="chaperoneName"
                value={this.state.chaperoneName}
                onChange={this.handleInputChange}
                label="Chaperone Name (Mandatory)"
                fullWidth
                required
              />
              <br />
              <br />
              <TextField
                variant="filled"
                name="comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
                label="Comment"
                fullWidth
                multiline
                rows={2}
              />
              <br />
              <br />
              <Button
                startIcon={<Done />}
                style={{
                  backgroundColor: "#2E7D32",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={this.handleAccept}
              >
                Complete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="SummaryMainDiv">
          <HeaderComponent selected="COO" />

          <div className="SummaryContentDiv">
            <div style={{ textAlign: "right" }}>
              <Button
                startIcon={<Refresh />}
                variant="contained"
                onClick={this.getTasks}
              >
                Refresh
              </Button>
            </div>
            <div className="SummaryTableDiv">
              <Table id="SummTable" bordered>
                <thead>
                  <tr>
                    {this.state.values.coo !== undefined &&
                      Object.keys(this.state.values.coo).map(
                        (item) =>
                          this.state.values.coo[item].active === true && (
                            <th>{this.state.values.coo[item].name}</th>
                          )
                      )}
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.length <= 0
                    ? "No Tasks"
                    : this.state.tasks.map((item) => (
                        <tr
                          id="tRow"
                          onClick={() => this.handleDialogOpen(item)}
                        >
                          {Object.keys(this.state.values.coo).map(
                            (key) =>
                              this.state.values.coo[key].active === true && (
                                <td>{item.taskData[key]}</td>
                              )
                          )}

                          {/* <td>{item.taskData.travelRequestId}</td>
                          <td>{item.taskData.employeePID}</td>
                          <td>{item.taskData.employeeName}</td>
                          <td>{item.taskData.aging}</td>
                          <td>{item.taskData.empDeptCode}</td>
                          <td>{item.taskData.empDeptName}</td>
                          <td>{item.taskData.workPlaceCountry}</td>
                          <td>{item.taskData.rowOrder}</td>
                          <td>{item.taskData.destinationId}</td>
                          <td>{item.taskData.division}</td>
                          <td>{item.taskData.employeePhnNbr}</td>
                          <td>{item.taskData.employeeType}</td>
                          <td>{item.taskData.queue}</td>
                          <td>{item.taskData.status}</td> */}
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default COOComponent;
