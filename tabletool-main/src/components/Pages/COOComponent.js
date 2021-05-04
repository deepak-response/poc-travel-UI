import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import { Cancel, Done, Refresh } from "@material-ui/icons";
import React, { Component } from "react";
import toast from "react-hot-toast";
import { Table } from "reactstrap";
import { APIURL } from "../../constants/APIURL";
import { pendingTaks } from "../../constants/Task_Details_COO&CDCP";
import HeaderComponent from "../HeaderComponent";
import LoadingComponent from "../LoadingComponent";

class COOComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      comment: "",

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
      "taskId": this.state.selectedRow.taskId,
      "userOutcome": "Reject",
      "comments": this.state.comment,
    })
  };

  rejectAPI = (creds) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(creds);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(APIURL + "travel-poc/completeTask", requestOptions)
      .then(response => response)
      .then(result => {
        console.log(result);
        toast.success("Task completed successfully with action Reject");
        this.handleDialogClose();
        this.getTasks();
      })
      .catch(error => {
        console.log('error', error);
        toast.error("Server Error");
        this.handleDialogClose();
      });
  }

  handleAccept = () => {
    this.approveAPI({
      "taskId": this.state.selectedRow.taskId,
      "userOutcome": "Approve",
      "comments": this.state.comment,
    })
  };

  approveAPI = (creds) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(creds);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(APIURL + "travel-poc/completeTask", requestOptions)
      .then(response => response)
      .then(result => {
        console.log(result);
        toast.success("Task completed successfully with action Approve");
        this.handleDialogClose();
        this.getTasks();
      })
      .catch(error => {
        console.log('error', error);
        toast.error("Server Error");
        this.handleDialogClose();
      });
  }

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
    if (selectedRow.taskData.comments === undefined) {
      comment = "";
    }
    else {
      comment = selectedRow.taskData.comments;
    }
    this.setState({
      dialogOpen: true,
      selectedRow: selectedRow,
      comment: comment,
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
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(APIURL + "travel-poc/getPendingTasks", requestOptions)
      .then(response => response.json())
      .then(result => {
        var tasks = [];
        tasks = result.filter((item) => item.taskDefKey === "COO");
        this.setState({
          tasks: tasks,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          isLoading: false,
        })
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
                Approve
              </Button>

              <Button
                startIcon={<Cancel />}
                style={{
                  backgroundColor: "#c62828",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={this.handleReject}
              >
                Reject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="SummaryMainDiv">
          <HeaderComponent selected="COO" />

          <div className="SummaryContentDiv">
            <div style={{ textAlign: "right" }}>
              <Button startIcon={<Refresh />} variant="contained" onClick={this.getTasks}>
                Refresh
              </Button>
            </div>
            <div className="SummaryTableDiv">
              <Table id="SummTable" bordered>
                <thead>
                  <tr>
                    <th>Travel Rq Id</th>
                    <th>Employee Pid</th>
                    <th>Employee Name</th>
                    <th>Aging (Travel Days)</th>
                    <th>Employee Dept Code</th>
                    <th>Employee Dept Name</th>
                    <th>Workplace Country</th>
                    <th>Row Order</th>
                    <th>Destination Id</th>
                    <th>Division</th>
                    <th>Employee Phone No</th>
                    <th>Employee Type</th>
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
                        <td>{item.taskData.travelRequestId}</td>
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
